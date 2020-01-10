import { UsersController } from '@mallowigi/users/src/users.controller';
import { UsersService }    from '@mallowigi/users/src/users.service';
import { Module }          from '@nestjs/common';

@Module({
  imports:     [],
  controllers: [UsersController],
  providers:   [UsersService],
})
export class AppModule {
}
