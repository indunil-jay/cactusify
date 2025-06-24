import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/orm/entities/user.entity';
import { CreateProductRepository } from 'src/products/application/ports/repositories/create-product.repository';
import { OrmCreateProductRepository } from './repositories/orm-create-product.repository';
import { ProductImageEntity } from './entities/product-image.entity';
import { CategoryEntity } from 'src/categories/infrastructure/presistence/orm/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      UserEntity,
      ProductImageEntity,
      CategoryEntity,
    ]),
  ],
  providers: [
    {
      provide: CreateProductRepository,
      useClass: OrmCreateProductRepository,
    },
  ],
  exports: [CreateProductRepository],
})
export class OrmProductsPersistenceModule {}
