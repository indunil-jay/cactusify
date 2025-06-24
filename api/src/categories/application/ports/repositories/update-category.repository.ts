import { Category } from 'src/categories/domain/category';

export abstract class UpdateCategoryRepository {
  abstract update(
    category: Partial<Pick<Category, 'name' | 'description' | 'slug'>> & {
      categoryId: string;
      parentIds?: string[];
    },
  ): Promise<Category>;
}
