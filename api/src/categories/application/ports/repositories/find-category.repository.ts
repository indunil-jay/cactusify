import { Category } from 'src/categories/domain/category';
import { PaginatedResponse } from 'src/shared/application/interfaces/paginated-response';
import { ExactlyOne } from 'src/shared/application/types/util-types';

export type CategoryFindOptions = ExactlyOne<Pick<Category, 'id'>>;

export abstract class FindCategoryRepository {
  abstract findOne(options: CategoryFindOptions): Promise<Category | null>;
  abstract findAll(
    page: number,
    limit: number,
    baseUrl: string,
    basePath: string,
  ): Promise<PaginatedResponse<Category | []>>;
}
