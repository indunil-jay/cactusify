import { ExactlyOne } from 'src/shared/application/types/util-types';
import { ResetPasswordToken } from 'src/users/domain/reset-password-token';

export type Filter = ExactlyOne<
  Pick<ResetPasswordToken, 'id' | 'userId' | 'token'>
>;
export abstract class FindResetPasswordTokenRepository {
  abstract findOne(options: Filter): Promise<ResetPasswordToken | null>;
}
