import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Filter,
  FindUserRepository,
} from 'src/users/application/ports/repositories/find-user.repository';
import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';
import { DatabaseExeception } from '../../../../../shared/infrastructure/exceptions/common.database.exception';

@Injectable()
export class OrmFindUserRepository implements FindUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  async findOne(filter: Filter): Promise<User | null> {
    try {
      const userEntity = await this.usersRepository.findOne({
        where: { ...filter },
      });

      if (!userEntity) return null;
      return UserMapper.toDomain(userEntity);
    } catch (error) {
      throw new DatabaseExeception(OrmFindUserRepository, error);
    }
  }
}
