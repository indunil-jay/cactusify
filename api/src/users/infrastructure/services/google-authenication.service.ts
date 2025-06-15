import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import googleConfig from 'src/shared/infrastructure/config/google.config';
import { GoogleSignPayload } from 'src/users/application/interfaces/google-sign-payload.interface';
import { IGoogleAuthenticationService } from 'src/users/application/ports/services/google-authentication.service';


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
  async autenticate(token: string): Promise<GoogleSignPayload> {
    try {
      // verify the google token sent by user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
      });
      //extract the payload from google JWT
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,

        picture: imageUrl,
      } = loginTicket.getPayload()!;
      return {
        googleId,
        email: email as string,
        firstName: firstName as string,
        lastName: lastName as string,

        imageUrl: imageUrl,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
