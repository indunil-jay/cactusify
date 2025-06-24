import { InjectRepository } from '@nestjs/typeorm';
import {
  Filter,
  FindResetPasswordTokenRepository,
} from 'src/users/application/ports/repositories/find-reset-password-token.repository';
import { ResetPasswordToken } from 'src/users/domain/reset-password-token';
import { PasswordResetTokenEntity } from '../entities/reset-password.entity';
import { Repository } from 'typeorm';
import { DatabaseExeception } from '../../../../../shared/infrastructure/exceptions/common.database.exception';
import { ResetPasswordTokenMapper } from '../mappers/reset-password-token.mapper';

export class OrmFindResetPasswordTokenRepository
  implements FindResetPasswordTokenRepository
{
  constructor(
    @InjectRepository(PasswordResetTokenEntity)
    private readonly passwordResetTokensRepository: Repository<PasswordResetTokenEntity>,
  ) {}
  async findOne(options: Filter): Promise<ResetPasswordToken | null> {
    try {
      const resetToken = await this.passwordResetTokensRepository.findOne({
        where: { ...options },
      });

      if (!resetToken) return null;
      return ResetPasswordTokenMapper.toDomain(resetToken);
    } catch (error) {
      throw new DatabaseExeception(OrmFindResetPasswordTokenRepository, error);
    }
  }
}
