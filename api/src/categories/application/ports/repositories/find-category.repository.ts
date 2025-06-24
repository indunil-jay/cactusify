import { Category } from 'src/categories/domain/category';
import { ExactlyOne } from 'src/shared/application/types/util-types';

export type CategoryFindOptions = ExactlyOne<Pick<Category, 'id'>>;

export abstract class FindCategoryRepository {
  abstract findOne(options: CategoryFindOptions): Promise<Category | null>;
  abstract findAll(page:number, limit:number): Promise<Category[] | []>;
}
