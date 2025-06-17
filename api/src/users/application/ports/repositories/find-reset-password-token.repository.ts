import { ResetPasswordToken } from 'src/users/domain/reset-password-token';

export abstract class FindResetPasswordTokenRepository {
  abstract findOne(userId: string): Promise<ResetPasswordToken | null>;
}
