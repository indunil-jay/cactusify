import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from '../user';

@Injectable()
export class UserFactory {
  create(
    email: string,
    firstName: string,
    password?: string,
    googleId?: string,
    lastName?: string,
    dataOfBirth?: Date,
    isEmailVerified: boolean = false,
  ) {
    const id = randomUUID();
    const username = firstName + '_' + `${lastName ? lastName : ''}`;
    const user = new User(id);
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.userName = username;
    user.password = password;
    user.dateOfBirth = dataOfBirth;
    user.role = 'regular';
    user.googleId = googleId;
    user.isEmailVerified = isEmailVerified;
    return user;
  }
}
