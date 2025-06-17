import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserPasswordChangedEvent } from '../../domain/events/user-password-changed.event';
import { Logger } from '@nestjs/common';

@EventsHandler(UserPasswordChangedEvent)
export class UserPasswordChangedEventHandler
  implements IEventHandler<UserPasswordChangedEvent>
{
  private readonly logger = new Logger(UserPasswordChangedEventHandler.name);
  handle(event: UserPasswordChangedEvent) {
    this.logger.debug(`User "Changed Password" event.`);
  }
}
