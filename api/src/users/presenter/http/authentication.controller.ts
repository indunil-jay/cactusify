import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationFacade } from 'src/users/application/authentication.facade';
import { SignUpCommand } from 'src/users/application/commands/sign-up.command';
import { SignInDto } from './dto/sign-in.dto';
import { SignInCommand } from 'src/users/application/commands/sign-in.command';
import { AuthType } from 'src/shared/enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenCommand } from 'src/users/application/commands/refresh-token.command';
import { Auth } from 'src/shared/decorators/authentication/auth.decorator';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationFacade: AuthenticationFacade) {}

  @Post('sign-up')
  signup(@Body() { email, password, firstName, lastName }: SignUpDto) {
    return this.authenticationFacade.signup(
      new SignUpCommand(email, firstName, password, lastName),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signin(@Body() { email, password }: SignInDto) {
    return this.authenticationFacade.signin(new SignInCommand(email, password));
  }
  // @HttpCode(HttpStatus.OK)
  // @Post('sign-in')
  // async signin(
  //   @Res({ passthrough: true }) response: Response,
  //   @Body() { email, password }: SignInDto,
  // ) {
  //   const { accessToken } = await this.authenticationFacade.signin(
  //     new SignInCommand(email, password),
  //   );

  //   response.cookie('accessToken', accessToken, {
  //     secure: true,
  //     httpOnly: true,
  //     sameSite: true,
  //   });
  // }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authenticationFacade.refreshToken(
      new RefreshTokenCommand(refreshTokenDto.refreshToken),
    );
  }
}
