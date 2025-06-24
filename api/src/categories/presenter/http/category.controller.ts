import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/application/decorators/authorization/role.decorator';
import { Role } from 'src/shared/application/enums/role.enum';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ActiveUser } from 'src/shared/application/decorators/authentication/active-user.decorator';
import { IActiveUser } from 'src/shared/application/interfaces/active-user.interface';
import { CategoryFacade } from 'src/categories/application/category.facade';
import { CreateCategoryCommand } from 'src/categories/application/commands/create-category.command';
import { GetCategoryByIdQuery } from 'src/categories/application/queries/get-category-by-id.query';

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

  @Get(':id')
  getOne(@Param("id") id: string) {
    return this.categoryFacade.getOne(new GetCategoryByIdQuery(id));
  }
}
