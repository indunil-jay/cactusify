import { DynamicModule, Module, Type } from '@nestjs/common';
import { UserFacade } from './user.facade';
import { UsersController } from '../presenter/http/users.controller';
import { UserFactory } from '../domain/factories/user.factory';
import { AuthenticationFacade } from './authentication.facade';
import { AuthenticationController } from '../presenter/http/authentication.controller';
import { UserCreatedEventHandler } from './event-handlers/user-created.event-handler';
import { UserLoggedEventHandler } from './event-handlers/user-logged.event-handler';
import { SignUpCommandHandler } from './commands/handlers/sign-up.command-handler';
import { SignInCommandHandler } from './commands/handlers/sign-in.command-handler';
import { RefreshTokenCommandHandler } from './commands/handlers/refresh-token.command-handler';
import { GoogleSignCommandHandler } from './commands/handlers/google-sign.command-handler';
import { TfaGenerateCommandHandler } from './commands/handlers/tfa-generate.command-handler';
import { UpdateProfilePictureCommandHandler } from './commands/handlers/update-profile-picture.command-handler';
import { UserUpdatedEventHandler } from './event-handlers/user-updated.event-handler';
import { UpdateUserCommandHandler } from './commands/handlers/update-profile.command-handler';
import { GoogleAuthenticationController } from '../presenter/http/google-authentication.controller';
import { ResetPasswordTokenFactory } from '../domain/factories/reset-password-token.factory';
import { ForgotPasswordCommandHandler } from './commands/handlers/forgot-password.command-handler';
import { ForgotPasswordEventHandler } from './event-handlers/forgot-password.event-handler';
import { PasswordResetEventHandler } from './event-handlers/password-reset.event-handler';
import { ResetPasswordCommandHandler } from './commands/handlers/reset-password.command-handler';
import { ChangePasswordCommandHandler } from './commands/handlers/change-password.command-handler';
import { UserPasswordChangedEventHandler } from './event-handlers/user-password-changed.event-handler';

@Module({
  controllers: [
    UsersController,
    AuthenticationController,
    GoogleAuthenticationController,
  ],
  providers: [
    UserFacade,
    UserFactory,
    AuthenticationFacade,
    SignUpCommandHandler,
    UserCreatedEventHandler,
    SignInCommandHandler,
    UserLoggedEventHandler,
    RefreshTokenCommandHandler,
    GoogleSignCommandHandler,
    TfaGenerateCommandHandler,
    UpdateProfilePictureCommandHandler,
    UserUpdatedEventHandler,
    UpdateUserCommandHandler,
    ResetPasswordTokenFactory,
    ForgotPasswordCommandHandler,
    ForgotPasswordEventHandler,
    ResetPasswordCommandHandler,
    PasswordResetEventHandler,
    ChangePasswordCommandHandler,
    UserPasswordChangedEventHandler
  ],
  exports: [AuthenticationFacade],
})
export class UsersModule {
  static withInfrastructure(infrastructureModule: DynamicModule | Type) {
    return {
      module: UsersModule,
      imports: [infrastructureModule],
    };
  }
}
