import { CreateUserResponse, IUser }                       from '@mallowigi/common';
import { Observable }                                      from '@mallowigi/users/node_modules/rxjs';
import { LoggingInterceptor }                              from '@mallowigi/users/src/logging.interceptor';
import { CreateUserSchema, GetUserSchema, GetUsersSchema } from '@mallowigi/users/src/schemas/users';
import { UsersService }                                    from '@mallowigi/users/src/users.service';
import { Controller, UseInterceptors }                     from '@nestjs/common';
import { GrpcMethod, MessagePattern }                      from '@nestjs/microservices';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @GrpcMethod('UsersService')
  async list(req: GetUsersSchema): Promise<Observable<IUser>> {
    return await this.usersService.list(req);
  }

  @GrpcMethod('UsersService')
  async get(req: GetUserSchema): Promise<IUser> {
    return await this.usersService.get(req);
  }

  @GrpcMethod('UsersService')
  async create(user: CreateUserSchema): Promise<CreateUserResponse<IUser>> {
    return await this.usersService.create(user);
  }

  @MessagePattern({ cmd: 'getUser' })
  async getUser(req: GetUserSchema): Promise<IUser> {
    return await this.usersService.get(req);
  }
}
