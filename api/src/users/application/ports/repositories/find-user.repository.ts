import { ExactlyOne } from 'src/shared/application/types/util-types';
import { User } from 'src/users/domain/user';

export type Filter = ExactlyOne<Pick<User, 'id' | 'email' | 'googleId'>>;

export abstract class FindUserRepository {
  abstract findOne(filter: Filter): Promise<User | null>;
}
