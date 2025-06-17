import { User } from "src/users/domain/user";

export class UserPasswordChangedEvent {
  constructor(public readonly user:User){}
}
