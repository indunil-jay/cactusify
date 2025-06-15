import { User } from 'src/users/domain/user';

export abstract class EmailService {
  abstract sendWelcome(user: User): Promise<void>;
}
