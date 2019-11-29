import { ValidationPipe } from '@nestjs/common';
import { Transport }      from '@nestjs/common/enums/transport.enum';
import { NestFactory }    from '@nestjs/core';
import { join }           from 'path';
import { AppModule }      from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options:   {
      package:   'service',
      url:       '0.0.0.0:50050',
      protoPath: join(__dirname, '../../common/proto/users/service.proto'),
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform:            true,
      forbidNonWhitelisted: true,
    }),
  );
  // tslint:disable-next-line:no-console
  await app.listen(() => console.log('users microservice is listening'));
}

bootstrap();
