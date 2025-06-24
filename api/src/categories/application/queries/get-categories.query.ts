export class GetCategoriesQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly baseUrl: string,
    public readonly basePath: string,
  ) {}
}
