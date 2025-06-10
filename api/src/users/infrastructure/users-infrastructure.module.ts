import { Module } from '@nestjs/common';
import { OrmUsersPersistenceModule } from './persistence/orm/orm-users-persistence.module';
import { InMemoryUsersPersistenceModule } from './persistence/in-memory/in-memeory-user-persistence.module';
import { HashingService } from '../application/ports/hashing.service';
import { BcryptService } from './services/bcrypt.service';
import { SharedModule } from 'src/shared/shared.module';
@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  exports: [HashingService, SharedModule],
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
