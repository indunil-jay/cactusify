import { CreateAddressCommand } from './create-address.command';

export class UpdateUserCommand {
  constructor(
    public readonly userId: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly userName?: string,
    public readonly bio?: string,
    public readonly dateOfBirth?: Date,
    public readonly file?: Express.Multer.File,
    public readonly address?: CreateAddressCommand,
  ) {}
}
