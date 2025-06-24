import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryCommand } from '../update-category.command';
import { Category } from 'src/categories/domain/category';
import { UpdateCategoryRepository } from '../../ports/repositories/update-category.repository';
import { CategoryUpdatedEvent } from 'src/categories/domain/events/category-updated.event';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(
    private readonly updateCategoryRepository: UpdateCategoryRepository,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: UpdateCategoryCommand): Promise<Category> {
    const updatedCategory = await this.updateCategoryRepository.update(command);
    this.eventBus.publish(new CategoryUpdatedEvent(updatedCategory));
    return updatedCategory;
  }
}
