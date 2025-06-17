import { ResetPasswordToken } from 'src/users/domain/reset-password-token';
import { User } from 'src/users/domain/user';

export class ForgotPasswordEvent {
  constructor(
    public readonly user: User,
    public readonly passwordResetToken: ResetPasswordToken,
  ) {}
}
