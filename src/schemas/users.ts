import { IsString }   from 'class-validator';
import { Query, Pagination } from '@mallowigi/common';

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
