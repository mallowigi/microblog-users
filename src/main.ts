import { AppModule }                        from '@mallowigi/users/src/app.module';
import { usersGrpcClient, usersNatsClient } from '@mallowigi/users/src/clients.provider';
import { ValidationPipe }                   from '@nestjs/common';
import { NestFactory }                      from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(usersGrpcClient);
  app.connectMicroservice(usersNatsClient);

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
