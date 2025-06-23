import { ProductSize } from '../enums/product-size.enum';

export class CreateProductCommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly images: Express.Multer.File[],
    public readonly price: number,
    public readonly description: string,
    public readonly quantity: number,
    public readonly size: ProductSize,
    public readonly isActive: boolean,
    public readonly ageInMonths: number,
    public readonly slug?: string,
    public readonly scientificName?: string,
    public readonly discountPrice?: number,
  ) {}
}
