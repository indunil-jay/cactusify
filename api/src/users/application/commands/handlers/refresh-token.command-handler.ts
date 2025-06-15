import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenCommand } from '../refresh-token.command';
import jwtConfig from 'src/shared/infrastructure/config/jwt.config';
import { FindUserRepository } from '../../ports/repositories/find-user.repository';
import { IAuthenticationService } from '../../ports/services/authentication.service';
import { RefreshTokenPayload } from '../../interfaces/refresh-token-payload.interface';
import { RefreshTokensIdsRepository } from '../../ports/repositories/refresh-token-ids.repository';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { InvalidRefreshTokenException } from '../../exceptions/invalid-refresh-token.exception';
import { AuthTokensResponse } from '../../interfaces/auth-tokens-response.interface';
import { IActiveUser } from 'src/shared/application/interfaces/active-user.interface';

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
