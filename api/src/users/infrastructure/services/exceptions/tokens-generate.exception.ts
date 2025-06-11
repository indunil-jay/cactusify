import { UnauthorizedException } from '@nestjs/common';

export class TokenGenerateException extends UnauthorizedException {
  constructor() {
    super(`Failed to generate access or refresh token. Please try again `);
  }
}
