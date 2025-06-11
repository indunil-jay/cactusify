import { InjectRepository } from '@nestjs/typeorm';
import { FindUserRepository } from 'src/users/application/ports/find-user.repository';
import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../mappers/user.mapper';
import { Injectable } from '@nestjs/common';
import { DatabaseExeception } from '../../exceptions/common.database.exception';

@Injectable()
export class OrmFindUserRepository implements FindUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  async findOne(
    options: Partial<Pick<User, 'id' | 'email' | 'googleId'>>,
  ): Promise<User | null> {
    try {
      const userEntity = await this.usersRepository.findOneBy({
        ...options,
      });
      if (!userEntity) return null;
      return UserMapper.toDomain(userEntity);
    } catch (error) {
      throw new DatabaseExeception(OrmFindUserRepository, error);
    }
  }
}
