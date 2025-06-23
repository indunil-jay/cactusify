import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../create-product.command';
import { Product } from 'src/products/domain/product';
import { CreateProductRepository } from '../../ports/repositories/create-product.repository';
import { ProductFactory } from 'src/products/domain/factories/product.factory';
import { ProductSize } from 'src/products/domain/value-objects/product-size.vobject';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly createProductRepository: CreateProductRepository,
    private readonly productFactory: ProductFactory,
  ) {}
  async execute({
    name,
    price,
    quantity,
    isActive,
    description,
    ageInMonths,
    userId,
    size,
    discountPrice,
    slug,
    scientificName,
  }: CreateProductCommand): Promise<Product> {
    const product = this.productFactory.create(
      name,
      price,
      quantity,
      isActive,
      description,
      ageInMonths,
      userId,
      size,
      discountPrice,
      scientificName,
      slug,
    );
    const newProduct = await this.createProductRepository.save(product);

    return newProduct;
  }
}
