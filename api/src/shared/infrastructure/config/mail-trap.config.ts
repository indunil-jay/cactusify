import { registerAs } from '@nestjs/config';

export default registerAs('mailTrap', () => ({
  host: process.env.MAIL_HOST,
  port: process.env.SMPT_PORT,
  username: process.env.SMPT_USERNAME,
  password: process.env.SMPT_PASSWORD,
}));
