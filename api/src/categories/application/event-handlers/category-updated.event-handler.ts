import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CategoryUpdatedEvent } from 'src/categories/domain/events/category-updated.event';

@EventsHandler(CategoryUpdatedEvent)
export class CategoryUpdatedEventHandler
  implements IEventHandler<CategoryUpdatedEvent>
{
  private readonly logger = new Logger(CategoryUpdatedEventHandler.name);
  handle(event: CategoryUpdatedEvent) {
    this.logger.debug(
      `category "UPDATED" event : ${JSON.stringify(event.category)}`,
    );
  }
}
