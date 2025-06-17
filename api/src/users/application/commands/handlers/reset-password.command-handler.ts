import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ResetPasswordCommand } from '../reset-password.command';
import { FindResetPasswordTokenRepository } from '../../ports/repositories/find-reset-password-token.repository';
import { NOW } from '../../constants/constant-values';
import { AppResponse } from 'src/shared/application/types/app-response';
import { PasswordResetLinkHasExpiredException } from '../../exceptions/password-reset-link-expired.exception';
import { FindUserRepository } from '../../ports/repositories/find-user.repository';
import { InvalidResetTokenException } from '../../exceptions/invalid-reset-token.exception';
import { RESET_PASSWORD_SUCCESS_MESSAGE } from '../../constants/app-response.messages';
import { HashingService } from '../../ports/services/hashing.service';
import { UpdateUserRepository } from '../../ports/repositories/update-user.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { PasswordResetEvent } from '../../events/password-reset.event';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  constructor(
    private readonly findResetPasswordTokenRepository: FindResetPasswordTokenRepository,
    private readonly findUserRepository: FindUserRepository,
    private readonly hashingService: HashingService,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly eventBus: EventBus,
  ) {}
  async execute({
    password,
    token,
  }: ResetPasswordCommand): Promise<AppResponse> {
    //Validate reset token exists
    const resetPasswordToken =
      await this.findResetPasswordTokenRepository.findOne({ token });

    if (!resetPasswordToken) {
      throw new InvalidResetTokenException();
    }

    //Check token expiration
    if (resetPasswordToken.expiresAt < NOW) {
      throw new PasswordResetLinkHasExpiredException();
    }

    //Find the user associated with the token
    const user = await this.findUserRepository.findOne({
      id: resetPasswordToken.userId,
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    //Hash new password and update user
    const hashedPassword = await this.hashingService.hash(password);
    user.password = hashedPassword;
    const updatedUser = await this.updateUserRepository.update(user.id, user);

    this.eventBus.publish(
      new PasswordResetEvent(updatedUser, resetPasswordToken),
    );

    return new AppResponse(RESET_PASSWORD_SUCCESS_MESSAGE);
  }
}
