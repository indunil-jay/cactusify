import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseDriver } from 'src/common/enums/database-drivers.enum';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import { CqrsModule } from '@nestjs/cqrs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataResponseInterceptor } from 'src/shared/application/interceptors/data-response.interceptor';
import awsConfig from './config/aws.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV ? `.env.${ENV}.local` : `.env`,
      load: [appConfig, databaseConfig, awsConfig],
      validationSchema: environmentValidation,
    }),
    CqrsModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
  ],
})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === DatabaseDriver.ORM
        ? [
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.name'),
                autoLoadEntities: configService.get<boolean>(
                  'database.autoLoadEntities',
                ),
                synchronize: configService.get<boolean>('database.synchronize'),
              }),
            }),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
