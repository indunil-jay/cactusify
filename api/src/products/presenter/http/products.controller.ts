import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Roles } from 'src/shared/application/decorators/authorization/role.decorator';
import { Role } from 'src/shared/application/enums/role.enum';
import { ActiveUser } from 'src/shared/application/decorators/authentication/active-user.decorator';
import { IActiveUser } from 'src/shared/application/interfaces/active-user.interface';
import { ProductFacade } from 'src/products/application/product.facade';
import { CreateProductCommand } from 'src/products/application/commands/create-product.command';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productFacade: ProductFacade) {}

  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @ActiveUser() user: IActiveUser,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productFacade.create(
      new CreateProductCommand(
        user.sub,
        createProductDto.name,
        files,
        createProductDto.price,
        createProductDto.description,
        createProductDto.quantity,
        createProductDto.size,
        createProductDto.isActive,
        createProductDto.ageInMonths,
        createProductDto.slug,
        createProductDto.scientificName,
        createProductDto.discountPrice,
      ),
    );
  }
}
