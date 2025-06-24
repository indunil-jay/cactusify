import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/application/decorators/authorization/role.decorator';
import { Role } from 'src/shared/application/enums/role.enum';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ActiveUser } from 'src/shared/application/decorators/authentication/active-user.decorator';
import { IActiveUser } from 'src/shared/application/interfaces/active-user.interface';
import { CategoryFacade } from 'src/categories/application/category.facade';
import { CreateCategoryCommand } from 'src/categories/application/commands/create-category.command';
import { DeleteCategoryCommand } from 'src/categories/application/commands/delete-category.command';
import { GetCategoriesQueryDto } from './dto/get-categories-query.dto';
import { GetCategoriesQuery } from 'src/categories/application/queries/get-categories.query';

@ApiTags('category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryFacade: CategoryFacade) {}

  @Roles(Role.Admin)
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @ActiveUser() user: IActiveUser,
  ) {
    return this.categoryFacade.create(
      new CreateCategoryCommand(
        user.sub,
        createCategoryDto.name,
        createCategoryDto.description,
        createCategoryDto.slug,
        createCategoryDto.parentIds,
      ),
    );
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryFacade.remove(new DeleteCategoryCommand(id));
  }

  @Get()
  getAll(@Query() { limit, page }: GetCategoriesQueryDto) {
    console.log({ limit, page });
    return this.categoryFacade.getAll(new GetCategoriesQuery(page!, limit!));
  }
}
