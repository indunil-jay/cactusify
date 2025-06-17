import { UnauthorizedException } from "@nestjs/common";

export class PasswordResetLinkHasExpiredException extends UnauthorizedException{
  constructor(){
    super(
      `Your reset link has expired. Please request a new one and try again.`,
    );
  }
}
