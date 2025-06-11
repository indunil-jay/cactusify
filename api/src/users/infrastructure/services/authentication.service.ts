import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import jwtConfig from 'src/shared/config/jwt.config';
import { IActiveUser } from 'src/shared/interfaces/active-user.interface';
import { RefreshTokenPayload } from 'src/users/application/interfaces/refresh-token-payload.interface';
import { IAuthenticationService } from 'src/users/application/ports/authentication.service';
import { RefreshTokensIdsRepository } from 'src/users/application/ports/refresh-token-ids.repository';
import { User } from 'src/users/domain/user';
import { TokenGenerateException } from './exceptions/tokens-generate.exception';
import { AuthTokensResponse } from 'src/users/application/interfaces/auth-tokens-response.interface';
import { Role } from 'src/shared/enums/role.enum';

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly refreshTokenIdsRepository: RefreshTokensIdsRepository,
  ) {}
  public async signToken<T>(
    userId: string,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      { sub: userId, ...payload },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: expiresIn,
      },
    );
  }

  public async generateTokens(user: User): Promise<AuthTokensResponse> {
    try {
      const refreshTokenId = randomUUID();
      const [accessToken, refreshToken] = await Promise.all([
        this.signToken<Partial<IActiveUser>>(
          user.id,
          this.jwtConfiguration.accessTokenTtl,
          { email: user.email, role: user.role as Role },
        ),
        this.signToken<Partial<RefreshTokenPayload>>(
          user.id,
          this.jwtConfiguration.refreshTokenTtl,
          {
            refreshTokenId,
          },
        ),
      ]);

      //insert refreshtokenId to database
      await this.refreshTokenIdsRepository.insert(user.id, refreshTokenId);
      return { accessToken, refreshToken };
    } catch {
      throw new TokenGenerateException();
    }
  }
}
