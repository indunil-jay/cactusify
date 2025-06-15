import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRepository } from 'src/users/application/ports/repositories/create-user.repository';
import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../mappers/user.mapper';
import { UserAlreadyExistException } from '../../exceptions/user-already-exits.exception';

@Injectable()
export class OrmCreateUserRepository implements CreateUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  async save(user: User): Promise<User> {
    try {
      const entity = UserMapper.toPersistence(user);
      const userEntity = await this.usersRepository.save(entity);
      return UserMapper.toDomain(userEntity);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new UserAlreadyExistException();
      }
      throw err;
    }
  }
}
