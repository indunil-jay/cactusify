import { User } from 'src/users/domain/user';

export abstract class CreateUserRepository {
  abstract save(user: User): Promise<User>;
}
