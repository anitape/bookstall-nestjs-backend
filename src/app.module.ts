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

@Module({
  imports: [
    //подключение и настройка конфиг модуля из пакета @nestjs/config
    //в файле configuration указаны переменные окружения https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      load: [configuration],
    }),

    //подключение и настройка базы данных
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
