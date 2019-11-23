import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from 'src/users.service';
import { from } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  async list(@Req() req) {
    const users = await this.usersService.list(req);
    return from(users);
  }

  create(@Req() request) {
    return this.usersService.create(request);
  }
}
