import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { from }                               from 'rxjs';
import { CreateUserSchema }                   from 'src/schemas/createUser.schema';
import { GetUsersSchema }                     from 'src/schemas/getUsersSchema';
import { UsersService }                       from 'src/users.service';

@Controller('/users')
export class AppController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  async list(@Query() req: GetUsersSchema) {
    const users = await this.usersService.list(req);
    return from(users);
  }

  @Post()
  create(@Body() user: CreateUserSchema) {
    return this.usersService.create(user);
  }
}
