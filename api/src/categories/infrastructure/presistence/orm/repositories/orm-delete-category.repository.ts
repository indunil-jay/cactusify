import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteCategoryRepository } from 'src/categories/application/ports/repositories/delete-category.repository';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { DatabaseExeception } from 'src/shared/infrastructure/exceptions/common.database.exception';

@Injectable()
export class OrmDeleteCategoryRepository implements DeleteCategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async delete(id: string): Promise<void> {
    try {
      await this.categoryRepository.delete(id);
    } catch (error) {
      throw new DatabaseExeception(OrmDeleteCategoryRepository, error);
    }
  }
}
