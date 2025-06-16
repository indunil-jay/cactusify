import {
  IsDateString,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(32)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(32)
  lastName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(64)
  userName?: string;

  @IsISO8601()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  @MaxLength(256)
  bio?: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsOptional()
  address?: CreateAddressDto;
}
