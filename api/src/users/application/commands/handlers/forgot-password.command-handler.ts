import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';
import { ForgotPasswordCommand } from '../forgot-password.command';
import { FindUserRepository } from '../../ports/repositories/find-user.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { FindResetPasswordTokensRepository } from '../../ports/repositories/find-reset-password-tokens.repository';
import { DeleteResetPasswordTokensRepository } from '../../ports/repositories/delete-reset-password-tokens.repository';
import { ResetPasswordTokenFactory } from 'src/users/domain/factories/reset-password-token.factory';
import { CreateResetPasswordTokensRepository } from '../../ports/repositories/create-reset-password-tokens.repository';
import { AppResponse } from 'src/shared/application/types/app-response';
import {
  RESET_PASSWORD_EMAIL_SENT,
  RESET_PASSWORD_NOT_EXPIRED_MESSAGE,
} from '../../constants/app-response.messages';
import { ResetPasswordEmailSentEvent } from '../../events/reset-password-email-sent.event';

export const NOW = new Date();

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordCommandHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    private readonly findUsersRepository: FindUserRepository,
    private readonly findPasswordResetTokensRepository: FindResetPasswordTokensRepository,
    private readonly deletePasswordResetTokensRepository: DeleteResetPasswordTokensRepository,
    private readonly resetPasswordTokenFactory: ResetPasswordTokenFactory,
    private readonly createPasswordResetTokenRepository: CreateResetPasswordTokensRepository,
    private readonly eventBus: EventBus,
  ) {}
  async execute({ email }: ForgotPasswordCommand): Promise<AppResponse> {
    //check email exists
    const user = await this.findUsersRepository.findOne({ email });

    //if not send error
    if (!user) {
      throw new UserNotFoundException('email');
    }

    //check  if already token relsease and not expired
    const existintResetToken =
      await this.findPasswordResetTokensRepository.findOne(user.id);

    if (existintResetToken) {
      if (existintResetToken.expiresAt > NOW) {
        return new AppResponse(RESET_PASSWORD_NOT_EXPIRED_MESSAGE);
      } else {
        //delete the old token
        await this.deletePasswordResetTokensRepository.remove(
          existintResetToken.id,
        );
      }
    }

    //if not  create random token and save in db send email
    const token = uuid();
    const resetPasswordToken = this.resetPasswordTokenFactory.create(
      user.id,
      token,
    );

    const newResetPasswordToken =
      await this.createPasswordResetTokenRepository.save(resetPasswordToken);

    //send email
    this.eventBus.publish(
      new ResetPasswordEmailSentEvent(user, newResetPasswordToken),
    );
    return new AppResponse(RESET_PASSWORD_EMAIL_SENT);
  }
}
