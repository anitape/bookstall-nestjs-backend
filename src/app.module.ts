import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, {
  ConfigurationType,
} from './core/config/configurationType';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    //connecting and configuring the ConfigModule from the @nestjs/config package
    //environment variables are defined in the configuration file https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      load: [configuration],
    }),

    //connecting and configuring the database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigurationType>) => {
        const databaseSettings = configService.get('dbSettings', {
          infer: true,
        })!;

        return {
          type: 'postgres',
          host: databaseSettings.DB_HOST,
          port: databaseSettings.DB_PORT,
          username: databaseSettings.USERNAME,
          password: databaseSettings.PASSWORD,
          database: databaseSettings.DB_NAME,
          autoLoadEntities: true,
          synchronize: true,
          logger: 'debug',
        };
      },
    }),
    UsersModule,
    BooksModule,
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000,
          limit: 5,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
