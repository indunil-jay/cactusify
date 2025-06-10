export class SignUpCommand {
  constructor(
    public readonly email: string,
    public readonly firstName: string,
    public readonly password: string,
    public readonly lastName?: string,
  ) {}
}
