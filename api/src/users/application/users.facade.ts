import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateProfilePictureCommand } from './commands/update-profile-picture.command';
import { User } from '../domain/user';
import { UpdateUserCommand } from './commands/update-user.command';

@Injectable()
export class UsersFacade {
  constructor(private readonly commandBus: CommandBus) {}

  updateProfilePicture(
    updateProfilePictureCommand: UpdateProfilePictureCommand,
  ): Promise<User> {
    return this.commandBus.execute(updateProfilePictureCommand);
  }

  updateUser(updateUserCommand: UpdateUserCommand) {
    return this.commandBus.execute(updateUserCommand);
  }
}
