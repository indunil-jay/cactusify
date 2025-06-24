import { Category } from 'src/categories/domain/category';
import { CategoryEntity } from '../entities/category.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/orm/entities/user.entity';

export class CategoryMapper {
  static toDomain(categoryEntity: CategoryEntity): Category {
    const category = new Category(categoryEntity.id);
    category.name = categoryEntity.name;
    category.description = categoryEntity.description;
    category.slug = categoryEntity.slug;
    category.userId = categoryEntity.userId;

    if (categoryEntity.parent) {
      const parentEntity = new Category(categoryEntity.parent.id);
      parentEntity.name = categoryEntity.parent.name;
      parentEntity.description = categoryEntity.parent.description;
      parentEntity.slug = categoryEntity.parent.slug;

      category.parent = parentEntity;
    }

    return category;
  }

  static toPersistence(category: Category): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    categoryEntity.id = category.id;
    categoryEntity.name = category.name;
    categoryEntity.description = category.description;
    categoryEntity.slug = category.slug;

    if (category.parent) {
      const parentEntity = new CategoryEntity();
      parentEntity.id = category.parent.id;
      categoryEntity.parent = parentEntity;
    }
    if (category.userId) {
      categoryEntity.userId = category.userId;
      const user = new UserEntity();
      user.id = category.userId;
      categoryEntity.user = user;
    }

    return categoryEntity;
  }
}
