export interface PaginatedResponse<T> {
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };

  links: {
    first: string;
    last: string;
    current: string;
    next: string;
    previous: string;
  };

  data: T[];
}
