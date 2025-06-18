
import {
  IsBoolean,
  IsEnum,
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

  @MaxLength(256)
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2048)
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

  @MaxLength(256)
  @IsOptional()
  @IsString()
  scientificName?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  discountPrice?: number;
}
