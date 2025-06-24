import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CategoryCreatedEvent } from 'src/categories/domain/events/category-created.event';

@EventsHandler(CategoryCreatedEvent)
export class CategoryCreatedEventHandler
  implements IEventHandler<CategoryCreatedEvent>
{
  private readonly logger = new Logger(CategoryCreatedEventHandler.name);
  handle(event: CategoryCreatedEvent) {
    this.logger.debug(
      `category "CREATED" event : ${JSON.stringify(event.category)}`,
    );
  }
}
