import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/infrastructure/presistence/orm/entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { OrmCreateCategoryRepository } from './repositories/orm-create-category.repository';
import { CreateCategoryRepository } from 'src/categories/application/ports/repositories/create-category.repository';
import { UserEntity } from 'src/users/infrastructure/persistence/orm/entities/user.entity';
import { FindCategoryRepository } from 'src/categories/application/ports/repositories/find-category.repository';
import { OrmFindCategoryRepository } from './repositories/orm-find-category.repository';
import { DeleteCategoryRepository } from 'src/categories/application/ports/repositories/delete-category.repository';
import { OrmDeleteCategoryRepository } from './repositories/orm-delete-category.repository';
import { CategoryNestedRelationEntity } from './entities/category-nested.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      UserEntity,
      CategoryNestedRelationEntity,
    ]),
  ],
  providers: [
    {
      provide: CreateCategoryRepository,
      useClass: OrmCreateCategoryRepository,
    },
    {
      provide: FindCategoryRepository,
      useClass: OrmFindCategoryRepository,
    },
    {
      provide: DeleteCategoryRepository,
      useClass: OrmDeleteCategoryRepository,
    },
  ],

  exports: [
    CreateCategoryRepository,
    FindCategoryRepository,
    DeleteCategoryRepository,
  ],
})
export class OrmCategoryPresistenceModule {}
