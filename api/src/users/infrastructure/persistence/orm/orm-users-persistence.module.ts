import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserRepository } from 'src/users/application/ports/repositories/create-user.repository';
import { OrmCreateUserRepository } from './repositories/orm-create-user.repository';
import { FindUserRepository } from 'src/users/application/ports/repositories/find-user.repository';
import { OrmFindUserRepository } from './repositories/orm-find-user.repository';
import { RefreshTokenIdsEntity } from './entities/refresh-token-ids.entity';
import { RefreshTokensIdsRepository } from 'src/users/application/ports/repositories/refresh-token-ids.repository';
import { OrmRefreshTokensIdsRepository } from './repositories/orm-refresh-token-ids-storage.repository';
import { UpdateUserRepository } from 'src/users/application/ports/repositories/update-user.repository';
import { OrmUpdateUserRepository } from './repositories/orm-update-user.repository';
import { UserProfilePictureEntity } from './entities/user-profile-picture.entity';
import { UserAddressEntity } from './entities/user-address.entity';
import { PasswordResetTokenEntity } from './entities/reset-password.entity';
import { FindResetPasswordTokensRepository } from 'src/users/application/ports/repositories/find-reset-password-tokens.repository';
import { OrmFindResetPasswordTokenRepository } from './repositories/orm-find-reset-password.repository';
import { DeleteResetPasswordTokensRepository } from 'src/users/application/ports/repositories/delete-reset-password-tokens.repository';
import { OrmDeleteResetPasswordTokensRepository } from './repositories/orm-delete-reset-password-tokens.repository';
import { CreateResetPasswordTokensRepository } from 'src/users/application/ports/repositories/create-reset-password-tokens.repository';
import { OrmCreateResetPasswordTokensRepository } from './repositories/orm-create-reset-password-tokens.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RefreshTokenIdsEntity,
      UserProfilePictureEntity,
      UserAddressEntity,
      PasswordResetTokenEntity,
    ]),
  ],
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

    {
      provide: FindResetPasswordTokensRepository,
      useClass: OrmFindResetPasswordTokenRepository,
    },
    {
      provide: DeleteResetPasswordTokensRepository,
      useClass: OrmDeleteResetPasswordTokensRepository,
    },
    {
      provide: CreateResetPasswordTokensRepository,
      useClass: OrmCreateResetPasswordTokensRepository,
    },
  ],
  exports: [
    CreateUserRepository,
    FindUserRepository,
    RefreshTokensIdsRepository,
    UpdateUserRepository,
    FindResetPasswordTokensRepository,
    DeleteResetPasswordTokensRepository,
    CreateResetPasswordTokensRepository,
  ],
})
export class OrmUsersPersistenceModule {}
