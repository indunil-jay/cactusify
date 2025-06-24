export class Category {
  public name: string;
  public slug: string;
  public description: string;
  public userId: string;
  public createdAt?: Date;
  public parents?: Category[];
  public children?: Category[];
  constructor(public readonly id: string) {}

  public isSubcategory(): boolean {
    return !!this.parents;
  }
}
