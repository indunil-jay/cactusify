import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/shared/presenter/dto/pagination-query.dto';



class GetCategoriesBaseQueryDto {}


export class GetCategoriesQueryDto extends IntersectionType(
  GetCategoriesBaseQueryDto,PaginationQueryDto,
) {}
