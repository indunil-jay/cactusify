import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationService } from 'src/users/application/authentication.service';
import { SignUpCommand } from 'src/users/application/commands/sign-up.command';
import { SignInDto } from './dto/sign-in.dto';
import { SignInCommand } from 'src/users/application/commands/sign-in.command';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  signup(@Body() { email, password, firstName, lastName }: SignUpDto) {
    return this.authenticationService.signup(
      new SignUpCommand(email, firstName, password, lastName),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signin(@Body() { email, password }: SignInDto) {
    return this.authenticationService.signin(
      new SignInCommand(email, password),
    );
  }
}
