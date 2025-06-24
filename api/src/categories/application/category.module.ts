import { DynamicModule, Module, Type } from '@nestjs/common';
import { CategoryController } from '../presenter/http/category.controller';
import { CategoryFacade } from './category.facade';
import { CategoryFactory } from '../domain/factories/category.factory';
import { CreateCategoryCommandHandler } from './commands/handlers/create-category.command-handler';
import { GetCategoryByIdQueryHandler } from './queries/handlers/get-category-by-id.query-handler';
import { DeleteCategoryCommandHandler } from './commands/handlers/delete-category.command-handler';
import { GetCategoriesQueryHandler } from './queries/handlers/get-categories.query-handler';
import { SharedModule } from 'src/shared/application/shared.module';
import { CategoryCreatedEventHandler } from './event-handlers/category-created.event-handler';
import { CategoryDeletedEventHandler } from './event-handlers/category-deleted.event-handler';

@Module({
  imports: [SharedModule],
  providers: [
    CategoryFacade,
    CategoryFactory,
    CreateCategoryCommandHandler,
    GetCategoryByIdQueryHandler,
    DeleteCategoryCommandHandler,
    GetCategoriesQueryHandler,
    CategoryCreatedEventHandler,
    CategoryDeletedEventHandler
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
