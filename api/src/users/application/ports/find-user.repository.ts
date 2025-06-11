import { User } from 'src/users/domain/user';

export abstract class FindUserRepository {
  abstract findOne(
    options: Partial<Pick<User, 'id' | 'email' | 'googleId'>>,
  ): Promise<User | null>;
}
