import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CategoryFindOptions,
  FindCategoryRepository,
} from 'src/categories/application/ports/repositories/find-category.repository';
import { Category } from 'src/categories/domain/category';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { DatabaseExeception } from 'src/shared/infrastructure/exceptions/common.database.exception';
import { CategoryMapper } from '../mappers/category.mapper';

@Injectable()
export class OrmFindCategoryRepository implements FindCategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(page: number, limit: number): Promise<Category[] | []> {
    try {
      const categoryEntities = await this.categoryRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        relations: ['parents', 'parents.parent', 'children', 'children.child'],
      });
      if (categoryEntities.length === 0) return [];
      return categoryEntities.map((categoryEntity) =>
        CategoryMapper.toDomain(categoryEntity),
      );
    } catch (error) {
      console.log(error);
      throw new DatabaseExeception(OrmFindCategoryRepository, error);
    }
  }

  async findOne(options: CategoryFindOptions): Promise<Category | null> {
    try {
      const categoryEntity = await this.categoryRepository.findOne({
        where: { ...options },
        relations: ['parents', 'parents.parent', 'children', 'children.child'],
      });

      if (!categoryEntity) return null;
      return CategoryMapper.toDomain(categoryEntity);
    } catch (error) {
      throw new DatabaseExeception(OrmFindCategoryRepository, error);
    }
  }
}
