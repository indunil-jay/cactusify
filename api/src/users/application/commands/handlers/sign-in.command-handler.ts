import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { HashingService } from '../../ports/hashing.service';
import { FindUserRepository } from '../../ports/find-user.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { InvalidPasswordException } from '../../exceptions/invalid-password.exception';
import { UserLoggedEvent } from '../../events/user-logged.event';
import { SignInCommand } from '../sign-in.command';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/shared/config/jwt.config';
import { Inject } from '@nestjs/common';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  constructor(
    private readonly hashingService: HashingService,
    private readonly usersRepository: FindUserRepository,
    private readonly eventBus: EventBus,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async execute(command: SignInCommand): Promise<any> {
    //check user exist
    const user = await this.usersRepository.findOne({ email: command.email });
    if (!user) {
      throw new UserNotFoundException();
    }
    //check password match
    const isEqual = await this.hashingService.compare(
      command.password,
      user.password!,
    );
    if (!isEqual) {
      throw new InvalidPasswordException();
    }
    const accessToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    this.eventBus.publish(new UserLoggedEvent(user.email));
    return { accessToken };
  }
}
