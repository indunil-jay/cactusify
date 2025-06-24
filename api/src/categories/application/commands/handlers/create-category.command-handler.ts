import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../create-category.command';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryCommandHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor() {}

  execute(command: CreateCategoryCommand): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
