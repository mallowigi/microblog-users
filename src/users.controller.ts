import { Controller, UseInterceptors }                     from '@nestjs/common';
import { GrpcMethod }                                      from '@nestjs/microservices';
import { from }                                            from 'rxjs';
import { LoggingInterceptor }                              from 'src/logging.interceptor';
import { CreateUserSchema, GetUserSchema, GetUsersSchema } from 'src/schemas/users';
import { UsersService }                                    from 'src/users.service';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @GrpcMethod('UsersService')
  async list(req: GetUsersSchema) {
    const users = await this.usersService.list(req);
    return from(users);
  }

  @GrpcMethod('UsersService')
  async get(req: GetUserSchema) {
    return await this.usersService.get(req);
  }

  @GrpcMethod('UsersService')
  async create(user: CreateUserSchema) {
    const newUser = await this.usersService.create(user);
    return { user: newUser };
  }
}
