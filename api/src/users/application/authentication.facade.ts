import { Injectable } from '@nestjs/common';
import { SignUpCommand } from './commands/sign-up.command';
import { CommandBus } from '@nestjs/cqrs';
import { SignInCommand } from './commands/sign-in.command';
import { User } from '../domain/user';
import { RefreshTokenCommand } from './commands/refresh-token.command';
import { AuthTokensResponse } from './interfaces/auth-tokens-response.interface';
import { GoogleSignCommand } from './commands/google-sign.command';
import { TfaGenerateCommand } from './commands/tfa-generate.command';
import { ForgotPasswordCommand } from './commands/forgot-password.command';
import { AppResponse } from 'src/shared/application/types/app-response';
import { ResetPasswordCommand } from './commands/reset-password.command';

@Injectable()
export class AuthenticationFacade {
  constructor(private readonly commandBus: CommandBus) {}
  signup(signUpCommand: SignUpCommand): Promise<User> {
    return this.commandBus.execute(signUpCommand);
  }

  signin(signInCommand: SignInCommand): Promise<AuthTokensResponse> {
    return this.commandBus.execute(signInCommand);
  }

  refreshToken(refreshToken: RefreshTokenCommand): Promise<AuthTokensResponse> {
    return this.commandBus.execute(refreshToken);
  }

  googleSign(
    googleSignCommand: GoogleSignCommand,
  ): Promise<AuthTokensResponse> {
    return this.commandBus.execute(googleSignCommand);
  }

  generateTFA(tfaGenerateCommand: TfaGenerateCommand): Promise<string> {
    return this.commandBus.execute(tfaGenerateCommand);
  }

  forgotPassword(
    forgotPassswordCommand: ForgotPasswordCommand,
  ): Promise<AppResponse> {
    return this.commandBus.execute(forgotPassswordCommand);
  }

  resetPassword(
    resetPasswordCommand: ResetPasswordCommand,
  ): Promise<AppResponse> {
    return this.commandBus.execute(resetPasswordCommand);
  }
}
