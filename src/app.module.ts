import { clientsProviders }   from '@mallowigi/common';
import { UsersController }    from '@mallowigi/users/src/users.controller';
import { UsersService }       from '@mallowigi/users/src/users.service';
import { Module }             from '@nestjs/common';
import { ConfigModule }       from '@nestjs/config';
import { userModelProviders } from '@mallowigi/users/src/userModel.providers';

@Module({
  imports:     [ConfigModule.forRoot()],
  controllers: [UsersController],
  providers:   [...clientsProviders, ...userModelProviders, UsersService],
})
export class AppModule {
}
