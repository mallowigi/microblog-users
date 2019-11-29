import { Body, Controller, Get, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { from }                                                       from 'rxjs';
import { LoggingInterceptor }                                         from 'src/logging.interceptor';
import { CreateUserSchema }                                           from 'src/schemas/createUser.schema';
import { GetUsersSchema }                                             from 'src/schemas/getUsers.schema';
import { UsersService }                                               from 'src/users.service';

@UseInterceptors(LoggingInterceptor)
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
    return await this.usersService.get({ id });
  }

  @Post()
  async create(@Body() user: CreateUserSchema) {
    return await this.usersService.create(user);
  }
}
