import { User } from 'src/users/domain/user';

export abstract class IAuthenticationService {
  abstract signToken<T>(
    userId: string,
    expiresIn: number,
    payload?: T,
  ): Promise<string>;
  abstract generateTokens(user: User): Promise<[string, string]>;
}
