import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from 'src/shared/presenter/dto/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginatedResponse } from '../application/interfaces/paginated-response';
import { Mapper } from '../application/interfaces/mapper.interface';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral, K>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    Mapper: Mapper<T, K>,
    baseUrl: string,
    basePath: string,
    relations?: string[],
  ): Promise<PaginatedResponse<K>> {
    const entities = await repository.find({
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
      relations,
    });

    const domainEntities =
      entities.length === 0
        ? []
        : entities.map((entity) => Mapper.toDomain(entity));

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page + 1;
    const previousPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page - 1;

    const response: PaginatedResponse<K> = {
      data: domainEntities,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems,
        currentPage: paginationQuery.page,
        totalPages,
      },
      links: {
        first: `${baseUrl}${basePath}?page=${1}&limit=${paginationQuery.limit}`,
        last: `${baseUrl}${basePath}?page=${totalPages}&limit=${paginationQuery.limit}`,
        current: `${baseUrl}${basePath}?page=${paginationQuery.page}&limit=${paginationQuery.limit}`,
        next: `${baseUrl}${basePath}?page=${nextPage}&limit=${paginationQuery.limit}`,
        previous: `${baseUrl}${basePath}?page=${previousPage}&limit=${paginationQuery.limit}`,
      },
    };

    return response;
  }
}
