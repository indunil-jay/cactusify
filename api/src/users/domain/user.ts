export class User {
  public email: string;
  public firstName: string;
  public userName: string;
  public lastName?: string;
  public password?: string;
  public googleId?: string;
  public dataOfBirth?: Date;
  public bio?: string;
  public role: 'admin' | 'regular';
  public imageUrl?: string;
  public isEmailVerified: boolean = false;
  public isTfaEnabled: boolean = false;
  public tfaSecret?: string;

  constructor(public id: string) {}

  public enableTFA() {
    this.isTfaEnabled = true;
  }
  public disableTFA() {
    this.isTfaEnabled = false;
  }
}
