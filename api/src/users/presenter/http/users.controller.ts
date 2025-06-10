import { Controller, Get } from '@nestjs/common';

import { UsersService } from 'src/users/application/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  hello() {
    return 'Hello';
  }
}
