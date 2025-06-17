import { ResetPasswordToken } from 'src/users/domain/reset-password-token';
import { User } from 'src/users/domain/user';

export abstract class EmailService {
  abstract sendWelcome(user: User): Promise<void>;
  abstract sendResetPasswordEmail(
    user: User,
    resetPasswordToken: ResetPasswordToken,
  ): Promise<void>;
  abstract sendPasswordResetSuccess(user: User): Promise<void>;
}
