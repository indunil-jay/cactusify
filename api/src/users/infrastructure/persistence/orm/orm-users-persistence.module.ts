import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserRepository } from 'src/users/application/ports/create-user.repository';
import { OrmCreateUserRepository } from './repositories/orm-create-user.repository';
import { FindUserRepository } from 'src/users/application/ports/find-user.repository';
import { OrmFindUserRepository } from './repositories/orm-find-user.repository';
import { RefreshTokenIdsEntity } from './entities/refresh-token-ids.entity';
import { RefreshTokensIdsRepository } from 'src/users/application/ports/refresh-token-ids.repository';
import { OrmRefreshTokensIdsRepository } from './repositories/orm-refresh-token-ids-storage.repository';
import { UpdateUserRepository } from 'src/users/application/ports/update-user.repository';
import { OrmUpdateUserRepository } from './repositories/orm-update-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RefreshTokenIdsEntity])],
  providers: [
    {
      provide: CreateUserRepository,
      useClass: OrmCreateUserRepository,
    },
    {
      provide: FindUserRepository,
      useClass: OrmFindUserRepository,
    },

    {
      provide: RefreshTokensIdsRepository,
      useClass: OrmRefreshTokensIdsRepository,
    },
    {
      provide: UpdateUserRepository,
      useClass: OrmUpdateUserRepository,
    },
  ],
  exports: [
    CreateUserRepository,
    FindUserRepository,
    RefreshTokensIdsRepository,
    UpdateUserRepository,
  ],
})
export class OrmUsersPersistenceModule {}
