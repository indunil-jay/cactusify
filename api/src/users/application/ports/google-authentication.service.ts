import { GoogleSignPayload } from '../interfaces/google-sign-payload.interface';

export abstract class IGoogleAuthenticationService {
  abstract autenticate(token: string): Promise<GoogleSignPayload>;
}
