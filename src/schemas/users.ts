import { Pagination } from '@micro/common/src/schemas/pagination';
import { Query }      from '@micro/common/src/schemas/query';
import { IsString }   from 'class-validator';

export interface GetUsersSchema {
  query: Query;
  pagination: Pagination;
}

export class CreateUserSchema {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}

export interface GetUserSchema {
  id: string;
}
