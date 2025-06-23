import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProductCommand } from './commands/create-product.command';

@Injectable()
export class ProductFacade {
  constructor(private readonly commandBus: CommandBus) {}

  create(createProductCommand: CreateProductCommand) {
    return this.commandBus.execute(createProductCommand);
  }
}
