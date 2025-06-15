/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Inject,
  Injectable,
  OnModuleInit,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { config } from 'aws-sdk';
import awsConfig from 'src/core/config/aws.config';
import { UploadService } from 'src/shared/application/ports/upload.service';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AwsUploadService implements OnModuleInit, UploadService {
  constructor(
    @Inject(awsConfig.KEY)
    private readonly awsConfigService: ConfigType<typeof awsConfig>,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: this.awsConfigService.bucketName!,
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  private generateFileName(file: Express.Multer.File): string {
    //extract file Name
    let name = file.originalname.split('.')[0];
    //remove white spaces
    name = name.replace(/\s/g, '').trim();
    //extratc the extenstion
    const extenstion = path.extname(file.originalname);
    //genrate time stamp and append to the filenName (for unique)
    const timeStamp = new Date().getTime().toString().trim();
    //return file name concatanate with uuid
    return `${name}-${timeStamp}-${uuid()}${extenstion}`;
  }

  onModuleInit() {
    config.update({
      credentials: {
        accessKeyId: this.awsConfigService.userAccessKey!,
        secretAccessKey: this.awsConfigService.userSecretKey!,
      },
      region: this.awsConfigService.region!,
    });
  }
}
