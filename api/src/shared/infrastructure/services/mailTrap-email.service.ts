import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/shared/application/ports/mail.service';
import { User } from 'src/users/domain/user';

@Injectable()
export class MailTrapEmailService implements EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcome(user: User): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Onboarding Team <onboarding@cactusify.online@gmail.com>`,
      subject: `Welcome to cactusify 🌵`,
      template: `./welcome`,
    });
  }
}
