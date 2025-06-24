import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CategoryDeletedEvent } from 'src/categories/domain/events/category-deleted.event';

@EventsHandler(CategoryDeletedEvent)
export class CategoryDeletedEventHandler
  implements IEventHandler<CategoryDeletedEvent>
{
  private readonly logger = new Logger(CategoryDeletedEventHandler.name);
  handle(event: CategoryDeletedEvent) {
    this.logger.debug(`category "DELETED event`);
  }
}
