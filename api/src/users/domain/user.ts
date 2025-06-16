import { ProfilePicture } from './value-objects/profile-picture.vobject';
import { UserAddress } from './value-objects/user-address.vobject';

export class User {
  public email: string;
  public firstName: string;
  public userName: string;
  public lastName?: string;
  public password?: string;
  public googleId?: string;
  public dateOfBirth?: Date;
  public bio?: string;
  public role: 'admin' | 'regular';
  public isEmailVerified: boolean = false;
  public isTfaEnabled: boolean = false;
  public tfaSecret?: string;
  public profilePicture?: ProfilePicture;
  public address?: UserAddress;

  constructor(public readonly id: string) {}
}
