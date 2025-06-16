import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserUpdatedEvent } from 'src/users/domain/events/user-updated.event';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedEventHandler
  implements IEventHandler<UserUpdatedEvent>
{
  private readonly logger = new Logger(UserUpdatedEventHandler.name);

  handle(event: UserUpdatedEvent) {
    this.logger.debug(`"User Updated" event :${JSON.stringify(event)}`);
  }
}
