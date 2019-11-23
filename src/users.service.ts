import { Injectable }       from '@nestjs/common';
import { IUser, User }      from 'src/models/user';
import { CreateUserSchema } from 'src/schemas/createUser.schema';
import { GetUsersSchema }   from 'src/schemas/getUsersSchema';

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
      // logger.error({
      //   message,
      //   payload: { query, paginate }
      // });
      throw Error(message);
    }
  }

  public async create(request: CreateUserSchema): Promise<IUser> {
    const { username, password } = request;
    // Check if the user already exists
    const found = await User.find({ username });
    if (found.length) {
      throw Error('user already exists');
    }

    const user = new User({ username, password });
    return user.save();
  }
}
