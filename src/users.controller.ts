import { Body, Controller, Param, Query, UseInterceptors } from '@nestjs/common';
import { GrpcMethod }                                      from '@nestjs/microservices';
import { from }                                            from 'rxjs';
import { LoggingInterceptor }                              from 'src/logging.interceptor';
import { CreateUserSchema, Users }                         from 'src/schemas/users';
import { UsersService }                                    from 'src/users.service';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @GrpcMethod('UsersService')
  async list(@Query() req: Users) {
    const users = await this.usersService.list(req);
    return from(users);
  }

  @GrpcMethod('UsersService')
  async get(@Param('id') id: string) {
    return await this.usersService.get({ id });
  }

  @GrpcMethod('UsersService')
  async create(@Body() user: CreateUserSchema) {
    return await this.usersService.create(user);
  }
}
