import { Module } from '@nestjs/common';
import { UploadService } from '../application/ports/upload.service';
import { AwsUploadService } from './services/aws-upload.service';
import jwtConfig from './config/jwt.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import googleConfig from './config/google.config';
import tfaConfig from './config/tfa.config';
import mailTrapConfig from './config/mail-trap.config';
import { EmailService } from '../application/ports/mail.service';
import { MailTrapEmailService } from './services/mailTrap-email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(googleConfig),
    ConfigModule.forFeature(tfaConfig),
    ConfigModule.forFeature(mailTrapConfig),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('mailTrap.host'),
          secure: false,
          port: config.get<number>('mailTrap.port'),
          auth: {
            user: config.get<string>('mailTrap.username'),
            pass: config.get<string>('mailTrap.password'),
          },
        },
        defaults: {
          from: `cactusify <no-reply@cactusify.online@gmail.com`,
        },
        template: {
          dir: join(__dirname, `../presenter/templates`),
          adapter: new EjsAdapter({inlineCssEnabled:true}),

          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  providers: [
    { provide: UploadService, useClass: AwsUploadService },
    { provide: EmailService, useClass: MailTrapEmailService },
  ],
  exports: [
    UploadService,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(googleConfig),
    ConfigModule.forFeature(tfaConfig),
    EmailService,
  ],
})
export class SharedInfrastructureModule {}
