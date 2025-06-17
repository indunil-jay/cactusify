import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResetPasswordTokenRepository } from 'src/users/application/ports/repositories/delete-reset-password-token.repository';
import { PasswordResetTokenEntity } from '../entities/reset-password.entity';
import { Repository } from 'typeorm';
import { DatabaseExeception } from '../../exceptions/common.database.exception';

@Injectable()
export class OrmDeleteResetPasswordTokenRepository
  implements DeleteResetPasswordTokenRepository
{
  constructor(
    @InjectRepository(PasswordResetTokenEntity)
    private readonly passwordResetTokensRepository: Repository<PasswordResetTokenEntity>,
  ) {}
  async remove(id: string): Promise<void> {
    try {
      await this.passwordResetTokensRepository.delete(id);
    } catch (error) {
      throw new DatabaseExeception(
        OrmDeleteResetPasswordTokenRepository,
        error,
      );
    }
  }
}
