import { Module } from '@nestjs/common';
import { UploadService } from '../application/ports/upload.service';
import { AwsUploadService } from './services/aws-upload.service';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import googleConfig from './config/google.config';
import tfaConfig from './config/tfa.config';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(googleConfig),
    ConfigModule.forFeature(tfaConfig),
  ],
  providers: [{ provide: UploadService, useClass: AwsUploadService }],
  exports: [
    UploadService,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(googleConfig),
    ConfigModule.forFeature(tfaConfig),
  ],
})
export class SharedInfrastructureModule {}
