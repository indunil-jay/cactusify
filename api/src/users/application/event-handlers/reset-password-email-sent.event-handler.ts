import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ResetPasswordEmailSentEvent } from '../events/reset-password-email-sent.event';
import { Logger } from '@nestjs/common';
import { EmailService } from 'src/shared/application/ports/mail.service';

@EventsHandler(ResetPasswordEmailSentEvent)
export class ResetPasswordEmailSentEventHandler
  implements IEventHandler<ResetPasswordEmailSentEvent>
{
  private readonly logger = new Logger(ResetPasswordEmailSentEventHandler.name);

  constructor(private readonly emailService: EmailService) {}
  async handle(event: ResetPasswordEmailSentEvent) {
    await this.emailService.sendResetPasswordEmail(
      event.user,
      event.passwordResetToken,
    );
    this.logger.debug(`User "password reset" event`);
  }
}
