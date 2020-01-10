import { ClientProxy, ClientProxyFactory, Transport }      from '@mallowigi/users/node_modules/@nestjs/microservices';
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
    it('should return an array of users', async (done) => {
      const result = [];
      const req: GetUsersSchema = {
        pagination: null,
        query:      null,
      };

      const userDocumentObservable = await usersService.list(req);
      userDocumentObservable.subscribe({
        next:     val => {
          result.push(val);
        },
        complete: () => {
          expect(result.length).toBeGreaterThan(1);
          done();
        },
      });
    });
  });

  describe('get', () => {
    it('should return an user', async () => {
      const user = new UserModel({
        id:       '5e0e3e488df5fe1f00f308f7',
        username: 'Amya.Dach',
      });
      const req: GetUserSchema = {
        id: '5e0e3e488df5fe1f00f308f7',
      };

      const foundUser = await usersService.get(req);
      expect(foundUser.username).toBe(user.username);
      expect(foundUser.password).toBe(user.password);
    });
  });

  describe('create', () => {
    it('should create an user', async () => {
      const newUser = new UserModel({
        username: 'dark',
        password: 'world',
      });

      const result = {
        user: newUser,
      };
      const req: CreateUserSchema = newUser;

      expect(await usersService.create(req)).toBe(result);
    });
  });
});
