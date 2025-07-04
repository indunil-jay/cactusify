import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../create-category.command';
import { CategoryFactory } from 'src/categories/domain/factories/category.factory';
import { CreateCategoryRepository } from '../../ports/repositories/create-category.repository';
import { FindCategoryRepository } from '../../ports/repositories/find-category.repository';
import { Category } from 'src/categories/domain/category';
import { CategoryCreatedEvent } from 'src/categories/domain/events/category-created.event';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    private readonly categoryFactory: CategoryFactory,
    private readonly createCategoryRepository: CreateCategoryRepository,
    private readonly findCategoryRepository: FindCategoryRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    name,
    description,
    slug,
    userId,
    parentIds,
  }: CreateCategoryCommand): Promise<any> {
    const category = this.categoryFactory.create(
      name,
      description,
      userId,
      slug,
    );

    if (parentIds) {
      const categoryParents: Category[] = [];
      for (const parentId of parentIds) {
        const parent = await this.findCategoryRepository.findOne({
          id: parentId,
        });
        if (parent) {
          categoryParents.push(parent);
        }
      }
      category.parents = categoryParents;
    }

    const newCategory = await this.createCategoryRepository.save(category);
    this.eventBus.publish(new CategoryCreatedEvent(newCategory));
    return newCategory;
  }
}
