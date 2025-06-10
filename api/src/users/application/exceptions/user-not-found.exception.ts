import { UnauthorizedException } from '@nestjs/common';

export class UserNotFoundException extends UnauthorizedException {
  constructor(option: 'email' | 'id' = 'email') {
    super(`No user found with the provided ${option}.`);
  }
}
