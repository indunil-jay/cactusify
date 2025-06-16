import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailService } from 'src/shared/application/ports/mail.service';
import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedEvent>
{
  private readonly logger = new Logger(UserCreatedEventHandler.name);
  
  constructor(private readonly emailService: EmailService) {}

  handle(event: UserCreatedEvent) {
    this.logger.debug(`"User Created" event :${JSON.stringify(event)}`);
    this.emailService.sendWelcome(event.user);
  }
}
