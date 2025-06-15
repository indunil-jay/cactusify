export abstract class IOtpAuthenticationService {
  abstract generateSecret(email: string): { uri: string; secret: string };
  abstract verifyCode(token: string, secret: string): boolean;
  abstract enableTfaForUser(email: string, secret: string): Promise<void>;
}
