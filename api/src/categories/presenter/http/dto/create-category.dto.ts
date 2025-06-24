import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(64)
  name: string;

  @IsString()
  @MaxLength(1024)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(96)
  slug?: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}
