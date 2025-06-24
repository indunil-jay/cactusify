import { Category } from 'src/categories/domain/category';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryMapper {
  static toDomain(categoryEntity: CategoryEntity): Category {
    const category = new Category(categoryEntity.id);
    category.name = categoryEntity.name;
    category.description = categoryEntity.description;
    category.slug = categoryEntity.slug;
    category.userId = categoryEntity.userId;
    category.createdAt = categoryEntity.createdAt;

    if (categoryEntity.parents) {
      category.parents = categoryEntity.parents.map((parent) => {
        const parentEntity = new Category(parent.id);

        parentEntity.name = parent.name;
        parentEntity.description = parent.description;
        parentEntity.slug = parent.slug;
        parentEntity.userId = parent.userId;
        parentEntity.createdAt = parent.createdAt;
        return parentEntity;
      });
    }

    if (categoryEntity.children) {
      category.children = categoryEntity.children.map((child) => {
        const childCategory = new Category(child.id);
        childCategory.name = child.name;
        childCategory.description = child.description;
        childCategory.slug = child.slug;
        childCategory.userId = child.userId;
        childCategory.createdAt = child.createdAt;
        return childCategory;
      });
    }

    return category;
  }

  static toPersistence(category: Category): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    categoryEntity.id = category.id;
    categoryEntity.name = category.name;
    categoryEntity.description = category.description;
    categoryEntity.slug = category.slug;

    if (category.parents) {
      categoryEntity.parents = category.parents.map((parent) => {
        const parentEntity = new CategoryEntity();
        parentEntity.id = parent.id;
        parentEntity.name = parent.name;
        parentEntity.description = parent.description;
        parentEntity.slug = parent.slug;
        parentEntity.userId = parent.userId;
        parentEntity.createdAt = parent.createdAt!;
        return parentEntity;
      });
    }

    if (category.children) {
      categoryEntity.children = category.children.map((child) => {
        const childEntity = new CategoryEntity();
        childEntity.id = child.id;
        childEntity.name = child.name;
        childEntity.description = child.description;
        childEntity.slug = child.slug;
        childEntity.userId = child.userId;
        childEntity.createdAt = child.createdAt!;
        return childEntity;
      });
    }


    if (category.userId) {
      categoryEntity.userId = category.userId;
    }

    return categoryEntity;
  }
}
