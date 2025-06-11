import { User } from 'src/users/domain/user';

export abstract class UpdateUserRepository {
  abstract update(
    userId: string,
    user: Partial<Omit<User, 'email' | 'role' | 'id'>>,
  ): Promise<User>;
}
