import { ResetPasswordToken } from 'src/users/domain/reset-password-token';
import { PasswordResetTokenEntity } from '../entities/reset-password.entity';

export class ResetPasswordTokenMapper {
  static toDomain({
    id,
    userId,
    token,
    expiresAt,
    createdAt,
  }: PasswordResetTokenEntity): ResetPasswordToken {
    return new ResetPasswordToken(id, userId, token, expiresAt, createdAt);
  }

  static toPersistence(
    resetPasswordToken: ResetPasswordToken,
  ): PasswordResetTokenEntity {
    const resetTokenEntity = new PasswordResetTokenEntity();
    resetTokenEntity.id = resetPasswordToken.id;
    resetTokenEntity.userId = resetPasswordToken.userId;
    resetTokenEntity.token = resetPasswordToken.token;
    resetTokenEntity.expiresAt = resetPasswordToken.expiresAt;

    return resetTokenEntity;
  }
}
