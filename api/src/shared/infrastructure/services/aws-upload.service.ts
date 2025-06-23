import {
  Inject,
  Injectable,
  OnModuleInit,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import awsConfig from 'src/core/config/aws.config';
import { UploadService } from 'src/shared/application/ports/upload.service';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AwsUploadService implements OnModuleInit, UploadService {
  private s3Client!: S3Client;

  constructor(
    @Inject(awsConfig.KEY)
    private readonly awsConfigService: ConfigType<typeof awsConfig>,
  ) {}

  onModuleInit() {
    this.s3Client = new S3Client({
      region: this.awsConfigService.region!,
      credentials: {
        accessKeyId: this.awsConfigService.userAccessKey!,
        secretAccessKey: this.awsConfigService.userSecretKey!,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = this.generateFileName(file);

    const command = new PutObjectCommand({
      Bucket: this.awsConfigService.bucketName!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3Client.send(command);
      return key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File): string {
    let name = file.originalname.split('.')[0];
    name = name.replace(/\s/g, '').trim();
    const extenstion = path.extname(file.originalname);
    const timeStamp = new Date().getTime().toString().trim();
    return `${name}-${timeStamp}-${uuid()}${extenstion}`;
  }
}
