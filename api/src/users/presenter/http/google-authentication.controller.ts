import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/shared/application/decorators/authentication/auth.decorator';
import { AuthType } from 'src/shared/application/enums/auth-type.enum';
import { GoogleTokenDto } from './dto/google-token.dto';
import { GoogleSignCommand } from 'src/users/application/commands/google-sign.command';
import { AuthenticationFacade } from 'src/users/application/authentication.facade';

@Auth(AuthType.None)
@Controller('authentication/google')
export class GoogleAuthenticationController {
  constructor(private readonly authenticationFacade: AuthenticationFacade) {}

  @Post()
  authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    return this.authenticationFacade.googleSign(
      new GoogleSignCommand(googleTokenDto.token),
    );
  }
}
