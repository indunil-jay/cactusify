import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { HashingService } from '../../ports/hashing.service';
import { FindUserRepository } from '../../ports/find-user.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { InvalidPasswordException } from '../../exceptions/invalid-password.exception';
import { UserLoggedEvent } from '../../events/user-logged.event';
import { SignInCommand } from '../sign-in.command';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  constructor(
    private readonly hashingService: HashingService,
    private readonly usersRepository: FindUserRepository,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: SignInCommand): Promise<any> {
    //check user exist
    const user = await this.usersRepository.findOne({ email: command.email });
    if (!user) {
      throw new UserNotFoundException();
    }
    //check password match
    const isEqual = await this.hashingService.compare(
      command.password,
      user.password!,
    );
    if (!isEqual) {
      throw new InvalidPasswordException();
    }

    this.eventBus.publish(new UserLoggedEvent(user.email));
    return true;
  }
}
