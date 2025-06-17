import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationFacade } from 'src/users/application/authentication.facade';
import { SignUpCommand } from 'src/users/application/commands/sign-up.command';
import { SignInDto } from './dto/sign-in.dto';
import { SignInCommand } from 'src/users/application/commands/sign-in.command';
import { AuthType } from 'src/shared/application/enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenCommand } from 'src/users/application/commands/refresh-token.command';
import { Auth } from 'src/shared/application/decorators/authentication/auth.decorator';
import { ActiveUser } from 'src/shared/application/decorators/authentication/active-user.decorator';
import { Response } from 'express';
import { TfaGenerateCommand } from 'src/users/application/commands/tfa-generate.command';
import { toFileStream } from 'qrcode';
import { IActiveUser } from 'src/shared/application/interfaces/active-user.interface';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPassWordDto } from './dto/forgot-password.dto';
import { ForgotPasswordCommand } from 'src/users/application/commands/forgot-password.command';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordCommand } from 'src/users/application/commands/reset-password.command';

@ApiTags('authentication')
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
  signin(@Body() { email, password, tfaCode }: SignInDto) {
    return this.authenticationFacade.signin(
      new SignInCommand(email, password, tfaCode),
    );
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

  @Auth(AuthType.Bearer)
  @HttpCode(HttpStatus.OK)
  @Get('2fa/generate')
  async generateQrCode(
    @ActiveUser() activeUser: IActiveUser,
    @Res() response: Response,
  ) {
    const uri = await this.authenticationFacade.generateTFA(
      new TfaGenerateCommand(activeUser.email),
    );
    response.type('png');
    return toFileStream(response, uri);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPassWordDto) {
    return this.authenticationFacade.forgotPassword(
      new ForgotPasswordCommand(forgotPasswordDto.email),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Query('token') token: string,
  ) {
    return this.authenticationFacade.resetPassword(
      new ResetPasswordCommand(token, resetPasswordDto.password),
    );
  }
}
