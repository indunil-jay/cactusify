export class CreateCategoryCommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly slug?: string,
    public readonly parentId?: string,
  ) {}
}
