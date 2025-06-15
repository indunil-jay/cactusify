import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  bucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  region: process.env.AWS_REGION,
  cloudFrontUrl: process.env.AWS_CLOUDFRONT_URL,
  userAccessKey: process.env.AWS_USER_ACCESS_KEY,
  userSecretKey: process.env.AWS_USER_SECRET_KEY,
}));
