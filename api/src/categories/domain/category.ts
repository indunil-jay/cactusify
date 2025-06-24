export class Category {
  public name: string;
  public slug: string;
  public description: string;
  public createdAt?: Date;
  public parent?: Category;
  constructor(public readonly id: string) {}

  public isSubcategory(): boolean {
    return !!this.parent;
  }
}
