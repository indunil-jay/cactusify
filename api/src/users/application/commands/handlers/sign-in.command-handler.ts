import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HashingService } from '../../ports/hashing.service';
import { FindUserRepository } from '../../ports/find-user.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { InvalidPasswordException } from '../../exceptions/invalid-password.exception';
import { UserLoggedEvent } from '../../events/user-logged.event';
import { SignInCommand } from '../sign-in.command';
import { IAuthenticationService } from '../../ports/authentication.service';
import { AuthTokensResponse } from '../../interfaces/auth-tokens-response.interface';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  constructor(
    private readonly hashingService: HashingService,
    private readonly usersRepository: FindUserRepository,
    private readonly eventBus: EventBus,
    private readonly authenticationService: IAuthenticationService,
  ) {}
  async execute(command: SignInCommand): Promise<AuthTokensResponse> {
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
    const { accessToken, refreshToken } =
      await this.authenticationService.generateTokens(user);
    this.eventBus.publish(new UserLoggedEvent(user.email));
    return { accessToken, refreshToken };
  }
}
