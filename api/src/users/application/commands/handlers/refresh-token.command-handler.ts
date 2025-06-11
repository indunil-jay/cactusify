import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from '../refresh-token.command';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/shared/config/jwt.config';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IActiveUser } from 'src/shared/interfaces/active-user.interface';
import { FindUserRepository } from '../../ports/find-user.repository';
import { IAuthenticationService } from '../../ports/authentication.service';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly usersRepository: FindUserRepository,
    private readonly authenticationService: IAuthenticationService,
  ) {}
  async execute({ token }: RefreshTokenCommand): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<IActiveUser, 'sub'>
      >(token, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersRepository.findOne({ id: sub });
      const [accessToken, refreshToken] =
        await this.authenticationService.generateTokens(user!);
      return { accessToken, refreshToken };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
