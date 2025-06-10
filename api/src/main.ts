import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseDriver } from './common/enums/database-drivers.enum';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.register({ driver: DatabaseDriver.ORM }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
