import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationService } from 'src/users/application/authentication.service';
import { SignUpCommand } from 'src/users/application/commands/sign-up.command';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  signup(@Body() { email, password, firstName, lastName }: SignUpDto) {
    return this.authenticationService.signup(
      new SignUpCommand(email, firstName, password, lastName),
    );
  }
}
