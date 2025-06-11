import { Controller, Get } from '@nestjs/common';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { IActiveUser } from 'src/shared/interfaces/active-user.interface';

import { UsersService } from 'src/users/application/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  hello(@ActiveUser() user: IActiveUser) {
    console.log({ user });
    return 'Hello';
  }
}
