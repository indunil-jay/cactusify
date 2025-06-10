import { Injectable } from '@nestjs/common';
import { SignUpCommand } from './commands/sign-up.command';
import { CommandBus } from '@nestjs/cqrs';
import { SignInCommand } from './commands/sign-in.command';

@Injectable()
export class AuthenticationService {
  constructor(private readonly commandBus: CommandBus) {}
  signup(signUpCommand: SignUpCommand) {
    return this.commandBus.execute(signUpCommand);
  }

  signin(signInCommand: SignInCommand) {
    return this.commandBus.execute(signInCommand);
  }
}
