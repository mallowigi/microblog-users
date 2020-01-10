import { from }                                            from '@mallowigi/users/node_modules/rxjs';
import { Test }                                            from '@nestjs/testing';
import { UserModel }                                       from './models/userModel';
import { CreateUserSchema, GetUserSchema, GetUsersSchema } from './schemas/users';
import { UsersController }                                 from './users.controller';
import { UsersService }                                    from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers:   [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('list', () => {
    it('should return an array of users', async () => {
      const users = [
        new UserModel({
          username: 'hello',
          password: 'world',
        }), new UserModel({
          username: 'hola',
          password: 'mundo',
        }),
      ];

      const result = from(users);
      const req: GetUsersSchema = {
        pagination: null,
        query:      null,
      };
      jest.spyOn(usersService, 'list').mockImplementation(async () => await result);

      expect(await usersController.list(req)).toBe(result);
    });
  });

  describe('get', () => {
    it('should return an user', async () => {
      const user = new UserModel({
        username: 'hello',
        password: 'world',
      });

      const result = user;
      const req: GetUserSchema = {
        id: '123',
      };
      jest.spyOn(usersService, 'get').mockImplementation(async () => await result);

      expect(await usersController.get(req)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create an user', async () => {
      const newUser = new UserModel({
        username: 'hello',
        password: 'world',
      });

      const result = {
        user: newUser,
      };
      const req: CreateUserSchema = newUser;
      jest.spyOn(usersService, 'create').mockImplementation(async () => result);

      expect(await usersController.create(req)).toBe(result);
    });
  });
});
