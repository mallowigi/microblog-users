import { Transport } from '@nestjs/microservices';
import { join }      from 'path';

interface Client {
  transport: Transport;
  options: any;
}

export const natsClient: Client = {
  transport: Transport.NATS,
  options:   {
    url: process.env.NATS_URL || 'nats://localhost:4222',
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

export const clientsProviders = [
  {
    provide:  'NATS_CLIENT',
    useValue: natsClient,
  },
  {
    provide:  'USERS_GRPC_CLIENT',
    useValue: usersGrpcClient,
  },
];
