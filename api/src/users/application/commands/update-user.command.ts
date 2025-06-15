export class UpdateUserCommand {
  constructor(
    public readonly userId: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly userName?: string,
    public readonly bio?: string,
    public readonly dateOfBirth?: Date,
    public readonly file?: Express.Multer.File,
  ) {}
}
