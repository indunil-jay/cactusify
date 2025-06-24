import { Injectable } from '@nestjs/common';
import { CreateCategoryCommand } from './commands/create-category.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Category } from '../domain/category';
import { GetCategoryByIdQuery } from './queries/get-category-by-id.query';
import { AppResponse } from 'src/shared/application/types/app-response';

@Injectable()
export class CategoryFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createCategoryCommand: CreateCategoryCommand): Promise<Category> {
    return this.commandBus.execute(createCategoryCommand);
  }

  getOne(getCategoryByIdQuery: GetCategoryByIdQuery): Promise<AppResponse|Category> {
    return this.queryBus.execute(getCategoryByIdQuery);
  }
}
