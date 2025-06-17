import { UnauthorizedException } from '@nestjs/common';

export class InvalidResetTokenException extends UnauthorizedException {
  constructor() {
    super(`The password reset token is invalid or has already been used.`);
  }
}
