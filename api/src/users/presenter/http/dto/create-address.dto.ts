import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  addressLine1: string;

  @IsString()
  @IsOptional()
  @MaxLength(64)
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  city: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  state: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  zipCode: string;
}
