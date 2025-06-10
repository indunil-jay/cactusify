import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../presenter/http/users.controller';
import { UserFactory } from '../domain/factories/user.factory';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from '../presenter/http/authentication.controller';
import { UserCreatedEventHandler } from './event-handlers/user-created.event-handler';
import { UserLoggedEventHandler } from './event-handlers/user-logged.event-handler';
import { SignUpCommandHandler } from './commands/handlers/sign-up.command-handler';
import { SignInCommandHandler } from './commands/handlers/sign-in.command-handler';

@Module({
  controllers: [UsersController, AuthenticationController],
  providers: [
    UsersService,
    UserFactory,
    AuthenticationService,
    SignUpCommandHandler,
    UserCreatedEventHandler,
    SignInCommandHandler,
    UserLoggedEventHandler,
  ],
})
export class UsersModule {
  static withInfrastructure(infrastructureModule: DynamicModule | Type) {
    return {
      module: UsersModule,
      imports: [infrastructureModule],
    };
  }
}
