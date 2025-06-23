import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './commands/create-product.command';
import { Product } from '../domain/product';

@Injectable()
export class ProductFacade {
  constructor(private readonly commandBus: CommandBus) {}

  create(createProductCommand: CreateProductCommand): Promise<Product> {
    return this.commandBus.execute(createProductCommand);
  }
}
