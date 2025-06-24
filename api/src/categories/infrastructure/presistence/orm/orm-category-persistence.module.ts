import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/infrastructure/presistence/orm/entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { OrmCreateCategoryRepository } from './repositories/orm-create-category.repository';
import { CreateCategoryRepository } from 'src/categories/application/ports/repositories/create-category.repository';
import { UserEntity } from 'src/users/infrastructure/persistence/orm/entities/user.entity';
import { FindCategoryRepository } from 'src/categories/application/ports/repositories/find-category.repository';
import { OrmFindCategoryRepository } from './repositories/orm-find-category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, UserEntity]),
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
  ],

  exports: [CreateCategoryRepository, FindCategoryRepository],
})
export class OrmCategoryPresistenceModule {}
