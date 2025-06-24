import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoriesQuery } from '../get-categories.query';
import { Category } from 'src/categories/domain/category';
import { FindCategoryRepository } from '../../ports/repositories/find-category.repository';

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesQueryHandler
  implements IQueryHandler<GetCategoriesQuery>
{
  constructor(
    private readonly findCategoryRepository: FindCategoryRepository,
  ) {}
  async execute(query: GetCategoriesQuery): Promise<Category[] | []> {
    return await this.findCategoryRepository.findAll(query.page, query.limit);
  }
}
