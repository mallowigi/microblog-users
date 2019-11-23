import { IsString } from 'class-validator';

export class CreateUserSchema {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
