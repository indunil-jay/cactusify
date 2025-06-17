import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/shared/application/ports/mail.service';
import { ResetPasswordToken } from 'src/users/domain/reset-password-token';
import { User } from 'src/users/domain/user';
import { EmailSendFailedException } from '../exceptions/email-send-failed.exception';

@Injectable()
export class MailTrapEmailService implements EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordEmail(
    user: User,
    resetPasswordToken: ResetPasswordToken,
  ): Promise<void> {
    const resetLink = `http://localhost:3000/authentication/reset-password?${resetPasswordToken.token}`;
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: `Support Team <support@cactusify.online@gmail.com>`,
        subject: `Reset Your Password 🌵`,
        template: `./password-reset`,
        context: {
          userName: user.userName,
          resetLink,
        },
      });
    } catch (error) {
      throw new EmailSendFailedException('sendResetPasswordEmail', error);
    }
  }

  async sendWelcome(user: User): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: `Onboarding Team <onboarding@cactusify.online@gmail.com>`,
        subject: `Welcome to cactusify 🌵`,
        template: `./welcome`,
      });
    } catch (error) {
      throw new EmailSendFailedException('sendWelcome', error);
    }
  }
}
