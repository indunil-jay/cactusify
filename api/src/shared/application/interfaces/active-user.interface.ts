import { Role } from '../enums/role.enum';

export interface IActiveUser {
  /** sub => current user id */
  sub: string;

  /** current user email */
  email: string;

  role: Role;
}
