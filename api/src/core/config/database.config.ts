import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  port: parseInt(process.env.DATABASE_PORT!, 10) || 5433,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  autoLoadEntities:
    process.env.DATABASE_AUTO_LOAD_ENTITIES === 'true' ? true : false,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' ? true : false,
}));
