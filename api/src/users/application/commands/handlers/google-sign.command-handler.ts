import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { GoogleSignCommand } from '../google-sign.command';
import { FindUserRepository } from '../../ports/repositories/find-user.repository';
import { CreateUserRepository } from '../../ports/repositories/create-user.repository';
import { IAuthenticationService } from '../../ports/services/authentication.service';
import { UserFactory } from 'src/users/domain/factories/user.factory';
import { UserCreatedEvent } from 'src/users/domain/events/user-created.event';
import { AuthTokensResponse } from '../../interfaces/auth-tokens-response.interface';
import { ProfilePicture } from 'src/users/domain/value-objects/profile-picture.vobject';
import { IGoogleAuthenticationService } from '../../ports/services/google-authentication.service';

@CommandHandler(GoogleSignCommand)
export class GoogleSignCommandHandler
  implements ICommandHandler<GoogleSignCommand>
{
  constructor(
    private readonly googleAuthenticationService: IGoogleAuthenticationService,
    private readonly findUsersRepository: FindUserRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly authenticationService: IAuthenticationService,
    private readonly userFactory: UserFactory,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: GoogleSignCommand): Promise<AuthTokensResponse> {
    // get verified payload
    const { googleId, email, firstName, lastName, imageUrl } =
      await this.googleAuthenticationService.autenticate(command.token);

    //find the user in database using the googleId
    const user = await this.findUsersRepository.findOne({ googleId });

    //if the google if exists generate token
    if (user) {
      return this.authenticationService.generateTokens(user);
    } else {
      //if not create new user and then generate the token
      const newUser = this.userFactory.create(
        email,
        firstName,
        undefined,
        googleId,
        lastName,
        undefined,
        true,
      );
      if (imageUrl) {
        newUser.profilePicture = new ProfilePicture(imageUrl);
      }

      const savedUser = await this.createUserRepository.save(newUser);
      const { accessToken, refreshToken } =
        await this.authenticationService.generateTokens(savedUser);
      await this.eventBus.publish(new UserCreatedEvent(savedUser));
      return { accessToken, refreshToken };
    }
  }
}
