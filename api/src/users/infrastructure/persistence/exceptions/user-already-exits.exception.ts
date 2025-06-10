import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistException extends ConflictException {
  constructor() {
    super('Email Already exists. Please use a different email.');
  }
}
