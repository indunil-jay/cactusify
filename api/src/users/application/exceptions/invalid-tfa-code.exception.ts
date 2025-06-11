import { UnauthorizedException } from '@nestjs/common';

export class InvalidTfaCodeException extends UnauthorizedException {
  constructor() {
    super(`Invalid or expired 2FA code. Please try again.`);
  }
}
