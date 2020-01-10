import { LoggingInterceptor }                              from '@mallowigi/users/src/logging.interceptor';
import { CreateUserSchema, GetUserSchema, GetUsersSchema } from '@mallowigi/users/src/schemas/users';
import { UsersService }                                    from '@mallowigi/users/src/users.service';
import { Controller, UseInterceptors }                     from '@nestjs/common';
import { GrpcMethod }                                      from '@nestjs/microservices';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @GrpcMethod('UsersService')
  async list(req: GetUsersSchema) {
    return await this.usersService.list(req);
  }

  @GrpcMethod('UsersService')
  async get(req: GetUserSchema) {
    return await this.usersService.get(req);
  }

  @GrpcMethod('UsersService')
  async create(user: CreateUserSchema) {
    return await this.usersService.create(user);
  }
}
