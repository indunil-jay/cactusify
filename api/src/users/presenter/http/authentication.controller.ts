import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationService } from 'src/users/application/authentication.service';
import { SignUpCommand } from 'src/users/application/commands/sign-up.command';
import { SignInDto } from './dto/sign-in.dto';
import { SignInCommand } from 'src/users/application/commands/sign-in.command';
import { Response } from 'express';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { AuthType } from 'src/shared/enums/auth-type.enum';

@Auth(AuthType.None)
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
  // @HttpCode(HttpStatus.OK)
  // @Post('sign-in')
  // async signin(
  //   @Res({ passthrough: true }) response: Response,
  //   @Body() { email, password }: SignInDto,
  // ) {
  //   const { accessToken } = await this.authenticationService.signin(
  //     new SignInCommand(email, password),
  //   );

  //   response.cookie('accessToken', accessToken, {
  //     secure: true,
  //     httpOnly: true,
  //     sameSite: true,
  //   });
  // }
}
