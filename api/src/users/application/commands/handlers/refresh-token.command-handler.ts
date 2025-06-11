import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenCommand } from '../refresh-token.command';
import jwtConfig from 'src/shared/config/jwt.config';
import { IActiveUser } from 'src/shared/interfaces/active-user.interface';
import { FindUserRepository } from '../../ports/find-user.repository';
import { IAuthenticationService } from '../../ports/authentication.service';
import { RefreshTokenPayload } from '../../interfaces/refresh-token-payload.interface';
import { RefreshTokensIdsRepository } from '../../ports/refresh-token-ids.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { InvalidRefreshTokenException } from '../../exceptions/invalid-refresh-token.exception';
import { AuthTokensResponse } from '../../interfaces/auth-tokens-response.interface';

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
    private readonly refreshTokenIdsRepository: RefreshTokensIdsRepository,
  ) {}
  async execute({ token }: RefreshTokenCommand): Promise<AuthTokensResponse> {
    const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
      Pick<IActiveUser, 'sub'> & RefreshTokenPayload
    >(token, {
      secret: this.jwtConfiguration.secret,
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
    });

    const user = await this.usersRepository.findOne({ id: sub });

    if (!user) {
      throw new UserNotFoundException();
    }

    const isValid = await this.refreshTokenIdsRepository.validate(
      user.id,
      refreshTokenId,
    );

    if (isValid) {
      await this.refreshTokenIdsRepository.invalidate(user.id);
    } else {
      throw new InvalidRefreshTokenException();
    }

    return await this.authenticationService.generateTokens(user);
  }
}
