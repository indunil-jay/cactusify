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

@Module({
  controllers: [UsersController, AuthenticationController],
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
