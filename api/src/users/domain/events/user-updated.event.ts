import { User } from '../user';

export class UserUpdatedEvent {
  constructor(public readonly user: User) {}
}
