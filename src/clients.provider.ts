import { Transport } from '@nestjs/microservices';
import { join }      from 'path';

interface Client {
  transport: Transport;
  options: any;
}

export const authNatsClient: Client = {
  transport: Transport.NATS,
  options:   {
    url:   process.env.NATS_URL || 'nats://localhost:4222',
    queue: 'auth',
    name:  'auth',
  },
};

export const authorizationNatsClient: Client = {
  transport: Transport.NATS,
  options:   {
    url:   process.env.NATS_URL || 'nats://localhost:4222',
    queue: 'authorization',
    name:  'authorization',
  },
};

export const usersNatsClient: Client = {
  transport: Transport.NATS,
  options:   {
    url:   process.env.NATS_URL || 'nats://localhost:4222',
    queue: 'users',
    name:  'users',
  },
};

export const authGrpcClient: Client = {
  transport: Transport.GRPC,
  options:   {
    url:       '0.0.0.0:50051',
    package:   'service',
    protoPath: join(__dirname, '../../common/proto/auth/service.proto'),
  },
};

export const usersGrpcClient: Client = {
  transport: Transport.GRPC,
  options:   {
    url:       '0.0.0.0:50053',
    package:   'service',
    protoPath: join(__dirname, '../../common/proto/users/service.proto'),
  },
};

export const authorizationGrpcClient: Client = {
  transport: Transport.GRPC,
  options:   {
    url:       '0.0.0.0:50052',
    package:   'service',
    protoPath: join(__dirname, '../../common/proto/authorization/service.proto'),
  },
};

export const clientsProviders = [
  {
    provide:  'AUTH_NATS_CLIENT',
    useValue: authNatsClient,
  },
  {
    provide:  'AUTHORIZATION_NATS_CLIENT',
    useValue: authorizationNatsClient,
  },
  {
    provide:  'USERS_NATS_CLIENT',
    useValue: usersNatsClient,
  },
  {
    provide:  'AUTH_GRPC_CLIENT',
    useValue: authGrpcClient,
  },
  {
    provide:  'USERS_GRPC_CLIENT',
    useValue: usersGrpcClient,
  },
  {
    provide:  'AUTHORIZATION_GRPC_CLIENT',
    useValue: authorizationGrpcClient,
  },
];
