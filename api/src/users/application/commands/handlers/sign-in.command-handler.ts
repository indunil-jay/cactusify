import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { HashingService } from '../../ports/services/hashing.service';
import { FindUserRepository } from '../../ports/repositories/find-user.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { InvalidPasswordException } from '../../exceptions/invalid-password.exception';
import { UserLoggedEvent } from '../../events/user-logged.event';
import { SignInCommand } from '../sign-in.command';
import { IAuthenticationService } from '../../ports/services/authentication.service';
import { AuthTokensResponse } from '../../interfaces/auth-tokens-response.interface';
import { IOtpAuthenticationService } from '../../ports/services/otp-authentication.service';
import { InvalidTfaCodeException } from '../../exceptions/invalid-tfa-code.exception';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  constructor(
    private readonly hashingService: HashingService,
    private readonly usersRepository: FindUserRepository,
    private readonly eventBus: EventBus,
    private readonly authenticationService: IAuthenticationService,
    private readonly otpAuthenticationService: IOtpAuthenticationService,
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
    if (user.isTfaEnabled) {
      const isValid = this.otpAuthenticationService.verifyCode(
        command.tfaCode!,
        user.tfaSecret!,
      );

      if (!isValid) {
        throw new InvalidTfaCodeException();
      }
    }
    const { accessToken, refreshToken } =
      await this.authenticationService.generateTokens(user);
    this.eventBus.publish(new UserLoggedEvent(user.email));
    return { accessToken, refreshToken };
  }
}
