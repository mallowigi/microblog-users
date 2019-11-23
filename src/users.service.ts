import { logger }           from '@micro/common/dist/src';
import { Injectable }       from '@nestjs/common';
import { IUser, User }      from 'src/models/user';
import { CreateUserSchema } from 'src/schemas/createUser.schema';
import { GetUserSchema }    from 'src/schemas/getUser.schema';
import { GetUsersSchema }   from 'src/schemas/getUsers.schema';

@Injectable()
export class UsersService {
  async list(req: GetUsersSchema): Promise<IUser[]> {
    const { query, pagination } = req;

    try {
      const response = await User.paginate(query, pagination);
      return response.docs;
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

  public async create(request: CreateUserSchema): Promise<IUser> {
    const { username, password } = request;

    try {
      // Check if the user already exists
      const found = await User.find({ username });
      if (found.length) {
        throw Error('user already exists');
      }

      const user = new User({ username, password });
      await user.save();

      // Create the roles from the roles microservice
      // try {
      //   const createRoleRequest = { userId: user.id, type: 'user' };
      //   this.client.send({ cmd: 'createRole' }, createRoleRequest);
      // }
      // catch (error) {
      //   // If error, delete the created user
      //   await User.deleteOne({ id: user.id });
      //   throw new Error('could not create role');
      // }
      return user;
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

  public async get({ id }: GetUserSchema): Promise<IUser> {
    try {
      return await User.findOne({ _id: id });
    }
    catch (e) {
      const message = 'could not get user';
      // logger.error({
      //   message,
      //   payload: { id }
      // });
      throw Error(message);
    }
  }
}
