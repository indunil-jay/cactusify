import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST_USER_KEY } from 'src/shared/application/constants/request-user-key.constant';
import { ROLES_KEY } from 'src/shared/application/decorators/authorization/role.decorator';
import { Role } from 'src/shared/application/enums/role.enum';
import { IActiveUser } from '../../interfaces/active-user.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const contextRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!contextRoles) {
      return true;
    }
    const request = context
      .switchToHttp()
      .getRequest<{ [REQUEST_USER_KEY]: IActiveUser }>();
    const user = request[REQUEST_USER_KEY];

    return contextRoles.some((role) => user.role === role);
  }
}
