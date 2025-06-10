export class User {
  public email: string;
  public firstName: string;
  public userName: string;
  public lastName?: string;
  public password?: string;
  public dataOfBirth?: Date;
  public bio?: string;

  constructor(public id: string) {}
}
