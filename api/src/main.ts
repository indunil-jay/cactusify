import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseDriver } from './common/enums/database-drivers.enum';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Enable cors
  app.enableCors();

  //swagger setup
  const options = new DocumentBuilder()
    .setTitle('Cactusify/api')
    .setDescription('cactusify api endpoint documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
