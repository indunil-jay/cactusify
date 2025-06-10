import { Injectable } from '@nestjs/common';
import { SignUpCommand } from './commands/sign-up.command';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class AuthenticationService {
  constructor(private readonly commandBus: CommandBus) {}
  signup(signUpCommand: SignUpCommand) {
    return this.commandBus.execute(signUpCommand);
  }
}
