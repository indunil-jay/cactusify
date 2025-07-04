import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { AccessTokenGuard } from './guards/authentication/access-token.guard';
import { RoleGuard } from './guards/authorization/role.guard';
import { SharedInfrastructureModule } from '../infrastructure/shared-infrastructure.module';
import { PaginationProvider } from '../infrastructure/pagination.provider';

@Module({
  imports: [SharedInfrastructureModule],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },

    AccessTokenGuard,
    AuthenticationGuard,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    PaginationProvider,
  ],
  exports: [SharedInfrastructureModule],
})
export class SharedModule {}
