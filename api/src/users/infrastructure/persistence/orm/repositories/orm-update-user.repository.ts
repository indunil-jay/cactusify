import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserRepository } from 'src/users/application/ports/update-user.repository';
import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../mappers/user.mapper';
import { DatabaseExeception } from '../../exceptions/common.database.exception';

@Injectable()
export class OrmUpdateUserRepository implements UpdateUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  async update(
    userId: string,
    user: Partial<Omit<User, 'email' | 'role' | 'id'>>,
  ): Promise<User> {
    try {
      await this.usersRepository.update(userId, { ...user });
      const updatedEntity = await this.usersRepository.findOneByOrFail({
        id: userId,
      });
      return UserMapper.toDomain(updatedEntity);
    } catch (error) {
      throw new DatabaseExeception(OrmUpdateUserRepository, error);
    }
  }
}
