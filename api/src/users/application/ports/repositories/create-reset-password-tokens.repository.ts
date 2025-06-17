import { ResetPasswordToken } from 'src/users/domain/reset-password-token';

export abstract class CreateResetPasswordTokensRepository {
  abstract save(resetToken: ResetPasswordToken): Promise<ResetPasswordToken>;
}
