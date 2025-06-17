import { Injectable } from '@nestjs/common';
import { ResetPasswordToken } from '../reset-password-token';
import { randomUUID } from 'crypto';

// 10 min
const TOKEN_EXPIRES_MINUTES = 10 * 60 * 1000

@Injectable()
export class ResetPasswordTokenFactory {
  create(userId: string, resetToken: string): ResetPasswordToken {
    const id = randomUUID();
    const expiresAt = new Date(new Date().getTime() + TOKEN_EXPIRES_MINUTES);
    return new ResetPasswordToken(id, userId, resetToken, expiresAt);
  }
}
