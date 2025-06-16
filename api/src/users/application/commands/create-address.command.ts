export class CreateAddressCommand {
  constructor(
    public readonly addressLine1: string,
    public readonly state: string,
    public readonly city: string,
    public readonly zipCode: string,
    public readonly addressLine2?: string,
  ) {}
}
