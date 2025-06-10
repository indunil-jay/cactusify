import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserLoggedEvent } from '../events/user-logged.event';

@EventsHandler(UserLoggedEvent)
export class UserLoggedEventHandler implements IEventHandler<UserLoggedEvent> {
  private readonly logger = new Logger(UserLoggedEventHandler.name);

  handle(event: UserLoggedEvent) {
    this.logger.debug(`"User logged" event :${JSON.stringify(event)}`);
  }
}
