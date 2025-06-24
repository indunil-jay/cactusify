import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from '../delete-category.command';
import { DeleteCategoryRepository } from '../../ports/repositories/delete-category.repository';
import { CategoryDeletedEvent } from 'src/categories/domain/events/category-deleted.event';
import { FindCategoryRepository } from '../../ports/repositories/find-category.repository';
import { CategoryNotFoundException } from '../../exceptions/category-not-found.exception';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryCommandHandler
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(
    private readonly findCategoryRepository: FindCategoryRepository,
    private readonly deleteCategoryRepository: DeleteCategoryRepository,
    private readonly eventBus: EventBus,
  ) {}
  async execute(command: DeleteCategoryCommand): Promise<void> {
    const category = await this.findCategoryRepository.findOne({
      id: command.id,
    });
    if (!category) {
      throw new CategoryNotFoundException();
    }
    await this.deleteCategoryRepository.delete(command.id);
    this.eventBus.publish(new CategoryDeletedEvent());
  }
}
