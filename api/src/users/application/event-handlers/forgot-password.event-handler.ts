import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ForgotPasswordEvent } from '../events/forgot-password.event';
import { Logger } from '@nestjs/common';
import { EmailService } from 'src/shared/application/ports/mail.service';

@EventsHandler(ForgotPasswordEvent)
export class ForgotPasswordEventHandler
  implements IEventHandler<ForgotPasswordEvent>
{
  private readonly logger = new Logger(ForgotPasswordEventHandler.name);

  constructor(private readonly emailService: EmailService) {}
  async handle(event: ForgotPasswordEvent) {
    await this.emailService.sendResetPasswordEmail(
      event.user,
      event.passwordResetToken,
    );
    this.logger.debug(`User "forgot password" event`);
  }
}
