import { Controller, Get } from '@nestjs/common';
import { ActiveUser } from 'src/shared/decorators/authentication/active-user.decorator';
import { Roles } from 'src/shared/decorators/authorization/role.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { IActiveUser } from 'src/shared/interfaces/active-user.interface';
import { UsersFacade } from 'src/users/application/users.facade';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersFacade) {}

  @Get()
  @Roles(Role.Admin)
  hello(@ActiveUser() user: IActiveUser) {
    console.log({ user });
    return 'Hello';
  }
}
