import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/products/infrastructure/presistence/orm/entities/product.entity';
import { CategoryEntity } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
})
export class OrmCategoryPresistenceModule {}
