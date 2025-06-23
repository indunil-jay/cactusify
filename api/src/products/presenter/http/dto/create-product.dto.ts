import {
  IsBoolean,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { ProductSize } from 'src/products/application/enums/product-size.enum';

export class CreateProductDto {
  @MaxLength(256)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @MaxLength(5000)
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(ProductSize)
  size: ProductSize;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsPositive()
  ageInMonths: number;

  @MaxLength(300)
  @IsString()
  @IsOptional()
  slug?: string;

  @MaxLength(256)
  @IsOptional()
  @IsString()
  scientificName?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  discountPrice?: number;
}
