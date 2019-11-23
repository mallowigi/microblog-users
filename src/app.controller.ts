import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { from }                                      from 'rxjs';
import { CreateUserSchema }                          from 'src/schemas/createUser.schema';
import { GetUsersSchema }                            from 'src/schemas/getUsers.schema';
import { UsersService }                              from 'src/users.service';

@Controller('/users')
export class AppController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  async list(@Query() req: GetUsersSchema) {
    const users = await this.usersService.list(req);
    return from(users);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.usersService.get(id);
  }

  @Post()
  create(@Body() user: CreateUserSchema) {
    return this.usersService.create(user);
  }
}
