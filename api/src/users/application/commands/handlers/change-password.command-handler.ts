import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from '../change-password.command';
import { FindUserRepository } from '../../ports/repositories/find-user.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { HashingService } from '../../ports/services/hashing.service';
import { UnauthorizedException } from '@nestjs/common';
import { UpdateUserRepository } from '../../ports/repositories/update-user.repository';
import { UserPasswordChangedEvent } from '../../../domain/events/user-password-changed.event';
import { AppResponse } from 'src/shared/application/types/app-response';
import { InvalidPasswordException } from '../../exceptions/invalid-password.exception';
import { PASSWORD_CHANGED_SUCCESS_MESSAGE } from '../../constants/app-response.messages';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    private readonly findUserRepository: FindUserRepository,
    private readonly hashingService: HashingService,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    newPassword,
    oldPassword,
    userId,
  }: ChangePasswordCommand): Promise<AppResponse> {
    //get user
    const user = await this.findUserRepository.findOne({ id: userId });

    if (!user) {
      throw new UserNotFoundException();
    }

    //Compare provided old password with stored hashed password
    const isEqual = await this.hashingService.compare(
      oldPassword,
      user.password!,
    );

    if (!isEqual) {
      throw new InvalidPasswordException();
    }

    // Hash the new password
    const hashedPassword = await this.hashingService.hash(newPassword);
    // Update user's password in the domain object
    user.password = hashedPassword;
    // save in DB
    const updatedUser = await this.updateUserRepository.update(user.id, user);

    this.eventBus.publish(new UserPasswordChangedEvent(updatedUser));

    return new AppResponse(PASSWORD_CHANGED_SUCCESS_MESSAGE);
  }
}
