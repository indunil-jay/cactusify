export class UpdateProfilePictureCommand {
  constructor(
    public readonly file: Express.Multer.File,
    public readonly userId: string,
  ) {}
}
