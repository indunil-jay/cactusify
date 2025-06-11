import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  clientId: process.env.GOOGLE_CLIENT_ID,
}));
