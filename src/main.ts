import { AppModule }      from '@mallowigi/users/src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory }    from '@nestjs/core';
import { Transport }      from '@nestjs/microservices';
import { join }           from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options:   {
      url:       '0.0.0.0:50053',
      package:   'service',
      protoPath: join(__dirname, '../../common/proto/users/service.proto'),
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform:            true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.startAllMicroservicesAsync();
  await app.listen(3003);
}

bootstrap();
