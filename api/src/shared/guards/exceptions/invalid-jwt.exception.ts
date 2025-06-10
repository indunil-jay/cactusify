import { UnauthorizedException } from '@nestjs/common';

export class InvalidJWTException extends UnauthorizedException {
  constructor() {
    super(`Token is altered, malformed, or expired.`);
  }
}
