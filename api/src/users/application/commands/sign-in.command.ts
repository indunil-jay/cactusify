export class SignInCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly tfaCode?: string,
  ) {}
}
