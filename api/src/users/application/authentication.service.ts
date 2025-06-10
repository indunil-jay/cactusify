import { Injectable } from '@nestjs/common';
import { SignUpCommand } from './commands/sign-up.command';
import { CommandBus } from '@nestjs/cqrs';
import { SignInCommand } from './commands/sign-in.command';
import { User } from '../domain/user';

@Injectable()
export class AuthenticationService {
  constructor(private readonly commandBus: CommandBus) {}
  signup(signUpCommand: SignUpCommand): Promise<User> {
    return this.commandBus.execute(signUpCommand);
  }

  signin(signInCommand: SignInCommand): Promise<{ accessToken: string }> {
    return this.commandBus.execute(signInCommand);
  }
}
