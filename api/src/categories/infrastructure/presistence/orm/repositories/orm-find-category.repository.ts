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
  async findOne(options: CategoryFindOptions): Promise<Category | null> {
    try {
      const categoryEntity = await this.categoryRepository.findOne({
        where: { ...options },
        relations: ['parent'],
      });

      if (!categoryEntity) return null;
      return CategoryMapper.toDomain(categoryEntity);
    } catch (error) {
      console.log(error);
      throw new DatabaseExeception(OrmFindCategoryRepository, error);
    }
  }
}
