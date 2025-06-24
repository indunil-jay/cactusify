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
import { PaginationProvider } from 'src/shared/infrastructure/pagination.provider';
import { PaginatedResponse } from 'src/shared/application/interfaces/paginated-response';

@Injectable()
export class OrmFindCategoryRepository implements FindCategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  async findAll(
    page: number,
    limit: number,
    baseUrl: string,
    basePath: string,
  ): Promise<PaginatedResponse<Category | []>> {
    try {
      return this.paginationProvider.paginateQuery(
        { page, limit },
        this.categoryRepository,
        CategoryMapper,
        baseUrl,
        basePath,
        ['parents', 'parents.parent', 'children', 'children.child'],
      );
    } catch (error) {
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
