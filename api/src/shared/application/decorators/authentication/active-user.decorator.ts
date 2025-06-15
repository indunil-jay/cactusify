import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from 'src/shared/application/constants/request-user-key.constant';
import { IActiveUser } from '../../interfaces/active-user.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IActiveUser | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
