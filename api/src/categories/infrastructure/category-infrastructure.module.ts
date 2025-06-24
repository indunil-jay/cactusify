import { Module } from '@nestjs/common';
import { OrmCategoryPresistenceModule } from './presistence/orm/orm-category-persistence.module';
import { InMemoryCategoryPresistenceModule } from './presistence/in-memory/in-memory-category-persistence.module';

@Module({})
export class CategoryInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
     const persistenceModule =
       driver === 'orm'
         ? OrmCategoryPresistenceModule
         : InMemoryCategoryPresistenceModule;

     return {
       module: CategoryInfrastructureModule,
       imports: [persistenceModule],
       exports: [persistenceModule],
     };
   }
}
