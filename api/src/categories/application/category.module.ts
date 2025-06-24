import { DynamicModule, Module, Type } from '@nestjs/common';
import { CategoryController } from '../presenter/http/category.controller';
import { CategoryFacade } from './category.facade';

@Module({
  providers: [CategoryFacade],
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
