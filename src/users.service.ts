import { CreateRoleRequest, CreateUserResponse, IUsersService, logger, RoleType } from '@mallowigi/common';
import { authorizationNatsClient }                                                from '@mallowigi/users/src/clients.provider';
import { UserDocument, UserModel }                                                from '@mallowigi/users/src/models/userModel';
import { CreateUserSchema, GetUserSchema, GetUsersSchema }                        from '@mallowigi/users/src/schemas/users';
import { Injectable }                                                             from '@nestjs/common';
import { Client, ClientProxy }                                                    from '@nestjs/microservices';
import { from, Observable }                                                       from 'rxjs';

const defaultParams: GetUsersSchema = {
  query:      {},
  pagination: {
    limit: 10,
    page:  1,
  },
};

@Injectable()
export class UsersService implements IUsersService {
  @Client(authorizationNatsClient)
  client: ClientProxy;

  async onModuleInit() {
    await this.client.connect();
  }

  public async list(req: GetUsersSchema): Promise<Observable<UserDocument>> {
    const { query, pagination } = (
      req || defaultParams
    );

    try {
      const response = await UserModel.paginate(query, pagination);
      return from(response.docs as UserDocument[]);
    }
    catch (error) {
      const message = 'could not fetch users';
      logger.error({
        message,
        payload: { query, pagination },
      });
      throw Error(message);
    }
  }

  public async create(request: CreateUserSchema): Promise<CreateUserResponse<UserDocument>> {
    const { username, password } = request;

    try {
      // Check if the user already exists
      const found = await UserModel.find({ username });
      if (found.length) {
        throw Error('user already exists');
      }

      const user = new UserModel({ username, password });
      await user.save();

      // Create the roles from the roles microservice
      try {
        const createRoleRequest: CreateRoleRequest = { userId: user.id, type: RoleType.User };
        await this.client.send({ cmd: 'createRole' }, createRoleRequest).toPromise();
      }
      catch (error) {
        // If error, delete the created user
        await UserModel.deleteOne({ id: user.id });
        throw new Error('could not create role');
      }
      return { user };
    }
    catch (error) {
      const message = 'could not create user';
      logger.error({
        error,
        message,
        payload: { username },
      });
      throw Error(message);
    }
  }

  public async get({ id }: GetUserSchema): Promise<UserDocument> {
    try {
      return await UserModel.findOne({ _id: id });
    }
    catch (e) {
      const message = 'could not get user';
      logger.error({
        message,
        payload: { id },
      });
      throw Error(message);
    }
  }
}
