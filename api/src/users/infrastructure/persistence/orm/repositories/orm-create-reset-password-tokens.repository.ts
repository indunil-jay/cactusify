import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResetPasswordTokenRepository } from 'src/users/application/ports/repositories/create-reset-password-token.repository';
import { ResetPasswordToken } from 'src/users/domain/reset-password-token';
import { PasswordResetTokenEntity } from '../entities/reset-password.entity';
import { Repository } from 'typeorm';
import { DatabaseExeception } from '../../../../../shared/infrastructure/exceptions/common.database.exception';
import { ResetPasswordTokenMapper } from '../mappers/reset-password-token.mapper';

@Injectable()
export class OrmCreateResetPasswordTokenRepository
  implements CreateResetPasswordTokenRepository
{
  constructor(
    @InjectRepository(PasswordResetTokenEntity)
    private readonly passwordResetTokensRepository: Repository<PasswordResetTokenEntity>,
  ) {}
  async save(resetToken: ResetPasswordToken): Promise<ResetPasswordToken> {
    try {
      const entity = ResetPasswordTokenMapper.toPersistence(resetToken);
      const resetPasswordEntity =
        await this.passwordResetTokensRepository.save(entity);
      return ResetPasswordTokenMapper.toDomain(resetPasswordEntity);
    } catch (error) {
      throw new DatabaseExeception(
        OrmCreateResetPasswordTokenRepository,
        error,
      );
    }
  }
}
