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
    bio?: string,
    imageUrl?: string,
    isEmailVerified?: boolean,
  ) {
    const id = randomUUID();
    const username = firstName + '_' + `${lastName ? lastName : ''}`;
    const user = new User(id);
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    user.dataOfBirth = dataOfBirth;
    user.bio = bio;
    user.userName = username;
    user.role = 'regular';
    user.googleId = googleId;
    user.imageUrl = imageUrl;
    user.isEmailVerified = isEmailVerified
      ? isEmailVerified
      : user.isEmailVerified;

    return user;
  }
}
