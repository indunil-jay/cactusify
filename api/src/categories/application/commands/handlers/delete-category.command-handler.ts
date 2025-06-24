import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from '../delete-category.command';
import { DeleteCategoryRepository } from '../../ports/repositories/delete-category.repository';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryCommandHandler
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(
    private readonly deleteCategoryRepository: DeleteCategoryRepository,
  ) {}
  async execute(command: DeleteCategoryCommand): Promise<void> {
    await this.deleteCategoryRepository.delete(command.id);
  }
}
