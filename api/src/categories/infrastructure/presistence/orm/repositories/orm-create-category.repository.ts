import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryRepository } from 'src/categories/application/ports/repositories/create-category.repository';
import { Category } from 'src/categories/domain/category';
import { DatabaseExeception } from 'src/shared/infrastructure/exceptions/common.database.exception';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryMapper } from '../mappers/category.mapper';

@Injectable()
export class OrmCreateCategoryRepository implements CreateCategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}
  async save(category: Category): Promise<Category> {
    try {
      const persistenceModel = CategoryMapper.toPersistence(category);
      const categoryEntity =
        await this.categoriesRepository.save(persistenceModel);
      return CategoryMapper.toDomain(categoryEntity);
    } catch (error) {
      console.log(error)
      throw new DatabaseExeception(OrmCreateCategoryRepository, error);
    }
  }
}
