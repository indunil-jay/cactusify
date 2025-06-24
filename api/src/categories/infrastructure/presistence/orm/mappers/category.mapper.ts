import { Category } from 'src/categories/domain/category';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryNestedRelationEntity } from '../entities/category-nested.entity';

export class CategoryMapper {
  static toDomain(categoryEntity: CategoryEntity): Category {
    const category = new Category(categoryEntity.id);
    category.name = categoryEntity.name;
    category.description = categoryEntity.description;
    category.slug = categoryEntity.slug;
    category.userId = categoryEntity.userId;
    category.createdAt = categoryEntity.createdAt;

    // Map parents using parentRelations
    if (categoryEntity.parents) {
      category.parents = categoryEntity.parents.map((rel) => {
        const parent = rel.parent;

        const parentCategory = new Category(parent.id);
        parentCategory.name = parent.name;
        parentCategory.description = parent.description;
        parentCategory.slug = parent.slug;
        parentCategory.userId = parent.userId;
        parentCategory.createdAt = parent.createdAt;
        return parentCategory;
      });
    }

    // Map children using childRelations
    if (categoryEntity.children) {
      category.children = categoryEntity.children.map((rel) => {
        const child = rel.child;
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
    categoryEntity.userId = category.userId;

    // Map parents into parentRelations (join entity)
    if (category.parents && category.parents.length > 0) {
      categoryEntity.parents = category.parents.map((parent) => {
        console.log({ parent });
        const relation = new CategoryNestedRelationEntity();
        relation.parent = { id: parent.id } as CategoryEntity;
        relation.child = categoryEntity;
        return relation;
      });
    }

    // Map children into childRelations (join entity)
    if (category.children && category.children.length > 0) {
      categoryEntity.children = category.children.map((child) => {

        const relation = new CategoryNestedRelationEntity();
        relation.child = { id: child.id } as CategoryEntity;
        relation.parent = categoryEntity;
        return relation;
      });
    }

    return categoryEntity;
  }
}
