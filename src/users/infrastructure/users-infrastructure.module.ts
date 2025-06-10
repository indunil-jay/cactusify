import { Module } from '@nestjs/common';
import { OrmUsersPersistenceModule } from './persistence/orm/orm-users-persistence.module';
import { InMemoryUsersPersistenceModule } from './persistence/in-memory/in-memeory-user-persistence.module';

@Module({})
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
