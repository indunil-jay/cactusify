import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../create-product.command';
import { Product } from 'src/products/domain/product';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor() {}
  execute(command: CreateProductCommand): Promise<Product> {
    // create a product save product in db
  }
}
