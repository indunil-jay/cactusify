import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../presenter/http/users.controller';
import { UserFactory } from '../domain/factories/user.factory';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from '../presenter/http/authentication.controller';
import { SignUpCommandHandler } from './commands/sign-up.command-handler';
import { UserCreatedEventHandler } from './event-handlers/user-created.event-handler';

@Module({
  controllers: [UsersController, AuthenticationController],
  providers: [
    UsersService,
    UserFactory,
    AuthenticationService,
    SignUpCommandHandler,
    UserCreatedEventHandler,
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
