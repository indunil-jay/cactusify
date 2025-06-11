import { UnauthorizedException } from '@nestjs/common';

export class InvalidRefreshTokenException extends UnauthorizedException {
  constructor() {
    super('The refresh token is invalid, expired, or has already been used.');
  }
}
