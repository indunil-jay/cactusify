export class UpdateCategoryCommand {
  constructor(
    public readonly categoryId: string,
    public readonly name?: string,
    public readonly description?: string,
    public readonly slug?: string,
    public readonly parentIds?: string[],
  ) {}
}
