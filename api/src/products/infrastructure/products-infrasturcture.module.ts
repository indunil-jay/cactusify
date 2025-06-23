import { Module } from '@nestjs/common';
import { InMemoryProductsPersistenceModule } from './presistence/in-memory/in-memory-products-persistence.module';
import { OrmProductsPersistenceModule } from './presistence/orm/orm-products-persistence.module';

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
