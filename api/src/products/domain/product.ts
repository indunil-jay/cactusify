import { ProductSize } from './value-objects/product-size.vobject';

export class Product {
  public name: string;
  public price: number;
  public description: string;
  public quantity: number;
  public size: ProductSize;
  public isActive: boolean;
  public ageInMonths: number;
  public userId: string;
  public slug: string;
  public scientificName?: string;
  public discountPrice?: number;
  constructor(public readonly id: string) {}
}
