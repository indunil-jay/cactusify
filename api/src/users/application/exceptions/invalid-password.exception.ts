import { UnauthorizedException } from '@nestjs/common';

export class InvalidPasswordException extends UnauthorizedException {
  constructor() {
    super('Incorrect password. Please  try again.');
  }
}
