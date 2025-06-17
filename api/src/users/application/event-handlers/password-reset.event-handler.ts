import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PasswordResetEvent } from '../events/password-reset.event';
import { Logger } from '@nestjs/common';
import { EmailService } from 'src/shared/application/ports/mail.service';
import { DeleteResetPasswordTokenRepository } from '../ports/repositories/delete-reset-password-token.repository';

@EventsHandler(PasswordResetEvent)
export class PasswordResetEventHandler
  implements IEventHandler<PasswordResetEvent>
{
  private readonly logger = new Logger(PasswordResetEventHandler.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly deletePasswordResetTokenRepository: DeleteResetPasswordTokenRepository,
  ) {}
  async handle(event: PasswordResetEvent) {
    await this.emailService.sendPasswordResetSuccess(event.user);
    await this.deletePasswordResetTokenRepository.remove(
      event.resetPasswordToken.id,
    );
    this.logger.debug(`User "reset password" event`);
  }
}
