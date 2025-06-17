export class ResetPasswordToken {
  constructor(
    public id: string,
    public userId: string,
    public token: string,
    public expiresAt: Date,
    public createdAt?: Date,
  ) {}
}
