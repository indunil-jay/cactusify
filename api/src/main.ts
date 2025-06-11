import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseDriver } from './common/enums/database-drivers.enum';
import { ValidationPipe } from '@nestjs/common';
import { DataResponseInterceptor } from './shared/interceptors/data-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({ driver: DatabaseDriver.ORM }),
  );
  // Enable global request validation and transformation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove unexpected properties
      forbidNonWhitelisted: true, // Reject requests with unexpected properties
      transform: true, // Convert payloads to DTO instances and types
    }),
  );

  // Enable cors
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
