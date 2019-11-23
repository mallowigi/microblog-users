import { Injectable } from '@nestjs/common';
import { User, IUser } from 'src/models/user';

@Injectable()
export class UsersService {
  async list(req): Promise<IUser[]> {
    const { query, paginate } = req;

    try {
      const response = await User.paginate(query, paginate);
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
}
