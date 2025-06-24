import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/application/decorators/authorization/role.decorator';
import { Role } from 'src/shared/application/enums/role.enum';
import { CreateCategoryDto } from './dto/create-category.dto';

@Roles(Role.Admin)
@ApiTags('category')
@Controller('categories')
export class CategoryController {
  constructor() {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log({ createCategoryDto });
  }
}
