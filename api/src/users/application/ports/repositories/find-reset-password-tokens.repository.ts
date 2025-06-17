import { ResetPasswordToken } from 'src/users/domain/reset-password-token';

export abstract class FindResetPasswordTokensRepository {
  abstract findOne(userId: string): Promise<ResetPasswordToken | null>;
}
