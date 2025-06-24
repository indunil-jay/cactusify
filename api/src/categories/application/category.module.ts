import { DynamicModule, Module, Type } from '@nestjs/common';
import { CategoryController } from '../presenter/http/category.controller';
import { CategoryFacade } from './category.facade';
import { CategoryFactory } from '../domain/factories/category.factory';
import { CreateCategoryCommandHandler } from './commands/handlers/create-category.command-handler';
import { GetCategoryByIdQueryHandler } from './queries/handlers/get-category-by-id.query-handler';
import { DeleteCategoryCommandHandler } from './commands/handlers/delete-category.command-handler';

@Module({
  providers: [
    CategoryFacade,
    CategoryFactory,
    CreateCategoryCommandHandler,
    GetCategoryByIdQueryHandler,
    DeleteCategoryCommandHandler
  ],
  controllers: [CategoryController],
})
export class CategoryModule {
  static withInfrastructure(infrastructureModule: DynamicModule | Type) {
    return {
      module: CategoryModule,
      imports: [infrastructureModule],
    };
  }
}
