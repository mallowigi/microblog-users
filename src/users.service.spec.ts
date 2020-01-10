import { ClientProxy, ClientProxyFactory, Transport }      from '@mallowigi/users/node_modules/@nestjs/microservices';
import { from }                                            from '@mallowigi/users/node_modules/rxjs';
import { Test }                                            from '@nestjs/testing';
import { UserModel }                                       from './models/userModel';
import { CreateUserSchema, GetUserSchema, GetUsersSchema } from './schemas/users';
import { UsersService }                                    from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let client: ClientProxy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide:    'NATS_CLIENT',
          useFactory: () => {
            return ClientProxyFactory.create({
              transport: Transport.NATS,
            });
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    client = module.get<ClientProxy>('NATS_CLIENT');
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should have a client', () => {
    expect(usersService.client).toBeDefined();
  });

  it('should connect to the client on init', async () => {
    usersService.client = client;
    const spyInstance = jest.spyOn(usersService.client, 'connect');
    await usersService.onModuleInit();
    expect(spyInstance).toHaveBeenCalled();
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

      expect(await usersService.list(req)).toBe(result);
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

      expect(await usersService.get(req)).toBe(result);
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

      expect(await usersService.create(req)).toBe(result);
    });
  });
});
