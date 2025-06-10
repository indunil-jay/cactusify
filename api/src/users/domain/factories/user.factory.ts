import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from '../user';

@Injectable()
export class UserFactory {
  create(
    email: string,
    firstName: string,
    password?: string,
    lastName?: string,
    dataOfBirth?: Date,
    bio?: string,
  ) {
    const id = randomUUID();
    const user = new User(id);
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    user.dataOfBirth = dataOfBirth;
    user.bio = bio;

    return user;
  }
}
