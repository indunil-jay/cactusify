import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GoogleSignCommand } from '../google-sign.command';
import { IGoogleAuthenticationService } from '../../ports/google-authentication.service';
import { FindUserRepository } from '../../ports/find-user.repository';
import { CreateUserRepository } from '../../ports/create-user.repository';
import { IAuthenticationService } from '../../ports/authentication.service';
import { UserFactory } from 'src/users/domain/factories/user.factory';

@CommandHandler(GoogleSignCommand)
export class GoogleSignCommandHandler
  implements ICommandHandler<GoogleSignCommand>
{
  constructor(
    private readonly googleAuthenticationService: IGoogleAuthenticationService,
    private readonly usersRepository: FindUserRepository & CreateUserRepository,
    private readonly authenticationService: IAuthenticationService,
    private readonly userFactory: UserFactory,
  ) {}

  async execute(command: GoogleSignCommand): Promise<any> {
    // get verified payload
    const { name, email, googleId } =
      await this.googleAuthenticationService.autenticate(command.token);

    //find the user in database using the googleId
    const user = await this.usersRepository.findOne({ googleId });

    //if the google if exists generate token
    if (user) {
      return this.authenticationService.generateTokens(user);
    } else {
      //if not create new user and then generate the token
      const newUser = this.userFactory.create(email, name, undefined, googleId);
      const savedUser = await this.usersRepository.save(newUser);
      return this.authenticationService.generateTokens(savedUser);
    }
  }
}
