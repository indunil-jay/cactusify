import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../create-category.command';
import { CategoryFactory } from 'src/categories/domain/factories/category.factory';
import { CreateCategoryRepository } from '../../ports/repositories/create-category.repository';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    private categoryFactory: CategoryFactory,
    private createCategoryRepository: CreateCategoryRepository,
  ) {}

  async execute({
    name,
    description,
    slug,
    userId,
  }: CreateCategoryCommand): Promise<any> {
    const category = this.categoryFactory.create(
      name,
      description,
      userId,
      slug,
    );
    const newCategory = await this.createCategoryRepository.save(category);
    return newCategory;
  }
}
