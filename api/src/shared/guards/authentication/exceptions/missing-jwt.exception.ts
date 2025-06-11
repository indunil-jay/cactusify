import { UnauthorizedException } from '@nestjs/common';

export class MissingJWTException extends UnauthorizedException {
  constructor() {
    super('No JWT token found in the Authorization header.');
  }
}
