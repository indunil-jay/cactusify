import { ResetPasswordToken } from 'src/users/domain/reset-password-token';

export abstract class CreateResetPasswordTokenRepository {
  abstract save(resetToken: ResetPasswordToken): Promise<ResetPasswordToken>;
}
