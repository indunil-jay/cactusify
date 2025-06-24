import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/application/decorators/authorization/role.decorator';
import { Role } from 'src/shared/application/enums/role.enum';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ActiveUser } from 'src/shared/application/decorators/authentication/active-user.decorator';
import { IActiveUser } from 'src/shared/application/interfaces/active-user.interface';
import { CategoryFacade } from 'src/categories/application/category.facade';
import { CreateCategoryCommand } from 'src/categories/application/commands/create-category.command';

@Roles(Role.Admin)
@ApiTags('category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryFacade: CategoryFacade) {}

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
}
