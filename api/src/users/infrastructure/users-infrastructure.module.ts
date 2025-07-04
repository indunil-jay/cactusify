import { Module } from '@nestjs/common';
import { OrmUsersPersistenceModule } from './persistence/orm/orm-users-persistence.module';
import { InMemoryUsersPersistenceModule } from './persistence/in-memory/in-memeory-user-persistence.module';
import { HashingService } from '../application/ports/services/hashing.service';
import { BcryptService } from './services/bcrypt.service';
import { SharedModule } from 'src/shared/application/shared.module';
import { IAuthenticationService } from '../application/ports/services/authentication.service';
import { AuthenticationService } from './services/authentication.service';
import { GoogleAuthenticationService } from './services/google-authenication.service';
import { OtpAuthenticationService } from './services/otp-authentication.service';
import { IOtpAuthenticationService } from '../application/ports/services/otp-authentication.service';
import { IGoogleAuthenticationService } from '../application/ports/services/google-authentication.service';
@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: IAuthenticationService,
      useClass: AuthenticationService,
    },
    {
      provide: IGoogleAuthenticationService,
      useClass: GoogleAuthenticationService,
    },

    {
      provide: IOtpAuthenticationService,
      useClass: OtpAuthenticationService,
    },
  ],
  exports: [
    HashingService,
    SharedModule,
    IAuthenticationService,
    IGoogleAuthenticationService,
    IOtpAuthenticationService,
  ],
})
export class UsersInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm'
        ? OrmUsersPersistenceModule
        : InMemoryUsersPersistenceModule;

    return {
      module: UsersInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
