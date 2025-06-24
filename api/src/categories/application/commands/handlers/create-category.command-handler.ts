import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../create-category.command';
import { CategoryFactory } from 'src/categories/domain/factories/category.factory';
import { CreateCategoryRepository } from '../../ports/repositories/create-category.repository';
import { FindCategoryRepository } from '../../ports/repositories/find-category.repository';
import { Category } from 'src/categories/domain/category';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    private readonly categoryFactory: CategoryFactory,
    private readonly createCategoryRepository: CreateCategoryRepository,
    private readonly findCategoryRepository: FindCategoryRepository,
  ) {}

  async execute({
    name,
    description,
    slug,
    userId,
    parentId,
  }: CreateCategoryCommand): Promise<any> {
    let parentCategory: Category | undefined = undefined;
    if (parentId) {
      const existingParent = await this.findCategoryRepository.findOne({
        id: parentId,
      });

      parentCategory = existingParent ? existingParent : undefined;
    }
    const category = this.categoryFactory.create(
      name,
      description,
      userId,
      slug,
    );
    category.parent = parentCategory;

    const newCategory = await this.createCategoryRepository.save(category);
    return newCategory;
  }
}
