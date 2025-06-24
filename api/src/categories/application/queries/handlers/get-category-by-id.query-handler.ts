import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCategoryByIdQuery } from '../get-category-by-id.query';
import { FindCategoryRepository } from '../../ports/repositories/find-category.repository';
import { Category } from 'src/categories/domain/category';
import { AppResponse } from 'src/shared/application/types/app-response';
import { CATEGORY_NOT_FOUND_MESSAGE } from '../../constants/category-respons-messages.constant';

@QueryHandler(GetCategoryByIdQuery)
export class GetCategoryByIdQueryHandler
  implements IQueryHandler<GetCategoryByIdQuery>
{
  constructor(
    private readonly findCategoryRepository: FindCategoryRepository,
  ) {}
  async execute(query: GetCategoryByIdQuery): Promise<Category | AppResponse> {
    const category = await this.findCategoryRepository.findOne({
      id: query.id,
    });

    if (!category) {
      return new AppResponse(CATEGORY_NOT_FOUND_MESSAGE);
    }

    return category;
  }
}
