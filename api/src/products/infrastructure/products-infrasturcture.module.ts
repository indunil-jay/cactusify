import { Module } from '@nestjs/common';
import { OrmProductsPersistenceModule } from './orm/orm-products-persistence.module';
import { InMemoryProductsPersistenceModule } from './in-memory/in-memory-products-persistence.module';

@Module({})
export class ProductsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm'
        ? OrmProductsPersistenceModule
        : InMemoryProductsPersistenceModule;

    return {
      module: ProductsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
