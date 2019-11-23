import { Pagination } from 'common/src/schemas/pagination';
import { Query }      from 'common/src/schemas/query';

export interface GetUsersSchema {
  query: Query;
  pagination: Pagination;
}
