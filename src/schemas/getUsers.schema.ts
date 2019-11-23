import { Pagination } from '@micro/common/src/schemas/pagination';
import { Query }      from '@micro/common/src/schemas/query';

export interface GetUsersSchema {
  query: Query;
  pagination: Pagination;
}
