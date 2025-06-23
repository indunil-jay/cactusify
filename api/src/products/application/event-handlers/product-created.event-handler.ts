import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from 'src/products/domain/events/product-created.event';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedEventHandler
  implements IEventHandler<ProductCreatedEvent>
{
  private readonly logger = new Logger(ProductCreatedEventHandler.name);
  handle(event: ProductCreatedEvent) {
    this.logger.debug(
      `proudct "CREATED event : ${JSON.stringify(event.product)}`,
    );
  }
}
