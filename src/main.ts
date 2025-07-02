import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './core/config/configurationType';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //enabling a global validation pipe https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe());

  //requests from any domain are allowed
  app.enableCors({
    origin: '*', // allows requests from any domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // allowed HTTP methods
    credentials: true, // enables sending cookies
  });

  //accessing the ConfigService https://docs.nestjs.com/techniques/configuration#using-in-the-maints
  const configService = app.get(ConfigService<ConfigurationType>);
  const port = configService.get('apiSettings.PORT', { infer: true })!;

  await app.listen(port);
}
bootstrap();
