import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCategoryRepository } from 'src/categories/application/ports/repositories/update-category.repository';
import { Category } from 'src/categories/domain/category';
import { DatabaseExeception } from 'src/shared/infrastructure/exceptions/common.database.exception';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryNestedRelationEntity } from '../entities/category-nested.entity';
import { Repository, In } from 'typeorm';
import { CategoryMapper } from '../mappers/category.mapper';
import { CategoryNotFoundException } from 'src/categories/application/exceptions/category-not-found.exception';

@Injectable()
export class OrmUpdateCategoryRepository implements UpdateCategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    @InjectRepository(CategoryNestedRelationEntity)
    private readonly nestedRepo: Repository<CategoryNestedRelationEntity>,
  ) {}

  async update(
    category: Partial<Pick<Category, 'name' | 'description' | 'slug'>> & {
      categoryId: string;
      parentIds?: string[];
    },
  ): Promise<Category> {
    const { categoryId, name, slug, description, parentIds } = category;

    try {
      // 1) Load the category to ensure it exists
      const existing = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ['parents'],
      });
      if (!existing) {
        throw new CategoryNotFoundException();
      }

      // 2) If parentIds provided, diff and mutate join‐table manually
      if (parentIds) {
        const oldIds = existing.parents.map((r) => r.parentId);
        const toAdd = parentIds.filter((id) => !oldIds.includes(id));
        const toRemove = oldIds.filter((id) => !parentIds.includes(id));

        // 3) delete obsolete relations
        if (toRemove.length) {
          await this.nestedRepo.delete({
            childId: categoryId,
            parentId: In(toRemove),
          });
        }

        // 4) insert new relations
        if (toAdd.length) {
          const inserts = toAdd.map((pid) => {
            const rel = new CategoryNestedRelationEntity();
            rel.childId = categoryId;
            rel.parentId = pid;
            return rel;
          });
          await this.nestedRepo.save(inserts);
        }
      }

      // 5) Reload with full join-rows and children for mapping
      const reloaded = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ['parents', 'parents.parent', 'children', 'children.child'],
      });
      if (!reloaded) {
        throw new CategoryNotFoundException();
      }

      // 6) Update scalar fields
      if (name !== undefined) reloaded.name = name;
      if (slug !== undefined) reloaded.slug = slug;
      if (description !== undefined) reloaded.description = description;

      // 7) Save scalar changes
      const saved = await this.categoryRepository.save(reloaded);

      // 8) Map back to domain
      return CategoryMapper.toDomain(saved);
    } catch (err) {
      if (err instanceof CategoryNotFoundException) throw err;
      throw new DatabaseExeception(OrmUpdateCategoryRepository, err);
    }
  }
}
