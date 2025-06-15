import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserFactory } from 'src/users/domain/factories/user.factory';
import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';
import { User } from 'src/users/domain/user';
import { HashingService } from '../../ports/services/hashing.service';
import { CreateUserRepository } from '../../ports/repositories/create-user.repository';
import { SignUpCommand } from '../sign-up.command';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly eventBus: EventBus,
    private readonly hashingService: HashingService,
    private readonly usersRepository: CreateUserRepository,
  ) {}

  async execute({
    email,
    firstName,
    password,
    lastName,
  }: SignUpCommand): Promise<User> {
    const hashedPassword = await this.hashingService.hash(password);
    const user = this.userFactory.create(
      email,
      firstName,
      hashedPassword,
      undefined,
      lastName,
    );

    const newUser = await this.usersRepository.save(user);
    await this.eventBus.publish(new UserCreatedEvent(newUser));
    return newUser;
  }
}
