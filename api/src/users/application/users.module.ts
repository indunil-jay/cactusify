import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersFacade } from './users.facade';
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

@Module({
  controllers: [
    UsersController,
    AuthenticationController,
    GoogleAuthenticationController,
  ],
  providers: [
    UsersFacade,
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
