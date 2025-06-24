import { Category } from 'src/categories/domain/category';

export abstract class CreateCategoryRepository {
  abstract save(category: Category): Promise<Category>;
}
