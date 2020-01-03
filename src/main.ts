import { usersGrpcClientOptions } from '@micro/common/dist/src';
import { ValidationPipe }         from '@nestjs/common';
import { NestFactory }            from '@nestjs/core';
import { AppModule }              from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(usersGrpcClientOptions);
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
