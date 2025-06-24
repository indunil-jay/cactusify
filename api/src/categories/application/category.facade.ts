import { Injectable } from '@nestjs/common';
import { CreateCategoryCommand } from './commands/create-category.command';
import { CommandBus } from '@nestjs/cqrs';
import { Category } from '../domain/category';

@Injectable()
export class CategoryFacade {
  constructor(private readonly commandBus: CommandBus) {}

  create(createCategoryCommand: CreateCategoryCommand):Promise<Category> {
    return this.commandBus.execute(createCategoryCommand);
  }
}
