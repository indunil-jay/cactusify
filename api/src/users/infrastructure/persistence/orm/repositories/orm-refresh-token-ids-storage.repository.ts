import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokensIdsRepository } from 'src/users/application/ports/refresh-token-ids.repository';
import { RefreshTokenIdsEntity } from '../entities/refresh-token-ids.entity';
import { DatabaseExeception } from '../../exceptions/common.database.exception';

@Injectable()
export class OrmRefreshTokensIdsRepository
  implements RefreshTokensIdsRepository
{
  constructor(
    @InjectRepository(RefreshTokenIdsEntity)
    private readonly refreshTokensRepository: Repository<RefreshTokenIdsEntity>,
  ) {}
  async insert(userId: string, tokenId: string): Promise<void> {
    try {
      await this.refreshTokensRepository.save({
        userId: this.getKey(userId),
        tokenId,
      });
    } catch (error) {
      throw new DatabaseExeception(OrmRefreshTokensIdsRepository, error);
    }
  }
  async validate(userId: string, tokenId: string): Promise<boolean> {
    try {
      const refreshToken = await this.refreshTokensRepository.findOneByOrFail({
        userId: this.getKey(userId),
      });

      return refreshToken.tokenId === tokenId;
    } catch (error) {
      throw new DatabaseExeception(OrmRefreshTokensIdsRepository, error);
    }
  }
  async invalidate(userId: string): Promise<void> {
    try {
      await this.refreshTokensRepository.delete(this.getKey(userId));
    } catch (error) {
      throw new DatabaseExeception(OrmRefreshTokensIdsRepository, error);
    }
  }
  private getKey(userId: string): string {
    return `user-${userId}`;
  }
}
