import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/infrastructure/presistence/orm/entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { OrmCreateCategoryRepository } from './repositories/orm-create-category.repository';
import { CreateCategoryRepository } from 'src/categories/application/ports/repositories/create-category.repository';
import { UserEntity } from 'src/users/infrastructure/persistence/orm/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, UserEntity]),
  ],
  providers: [
    {
      provide: CreateCategoryRepository,
      useClass: OrmCreateCategoryRepository,
    },
  ],

  exports: [CreateCategoryRepository],
})
export class OrmCategoryPresistenceModule {}
