import { Injectable } from '@nestjs/common';
import { CreateProductRepository } from 'src/products/application/ports/repositories/create-product.repository';
import { Product } from 'src/products/domain/product';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMapper } from '../mappers/product.mapper';
import { DatabaseExeception } from 'src/users/infrastructure/persistence/exceptions/common.database.exception';

@Injectable()
export class OrmCreateProductRepository implements CreateProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  public async save(product: Product): Promise<Product> {
    try {
      const persistenceModel = ProductMapper.toPresistence(product);
      const productEntity =
        await this.productsRepository.save(persistenceModel);

      return ProductMapper.toDomain(productEntity);
    } catch (error) {
      throw new DatabaseExeception(OrmCreateProductRepository, error);
    }
  }
}
