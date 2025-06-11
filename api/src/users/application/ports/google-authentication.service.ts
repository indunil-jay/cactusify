export abstract class IGoogleAuthenticationService {
  abstract autenticate(
    token: string,
  ): Promise<{ email: string; name: string; googleId: string }>;
}
