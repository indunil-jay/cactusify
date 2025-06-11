import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import googleConfig from 'src/shared/config/google.config';
import { IGoogleAuthenticationService } from 'src/users/application/ports/google-authentication.service';

@Injectable()
export class GoogleAuthenticationService
  implements IGoogleAuthenticationService, OnModuleInit
{
  private oauthClient: OAuth2Client;
  constructor(
    @Inject(googleConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleConfig>,
  ) {}
  onModuleInit() {
    const clientId = this.googleConfiguration.clientId;
    const clientSecret = this.googleConfiguration.clientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }
  async autenticate(
    token: string,
  ): Promise<{ email: string; googleId: string; name: string }> {
    try {
      // verify the google token sent by user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
      });
      //extract the payload from google JWT
      const {
        email,
        sub: googleId,
        name,
        given_name,
        family_name,
      } = loginTicket.getPayload()!;

      console.log({ given_name, family_name, name });
      return { email: email as string, googleId, name: name as string };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
