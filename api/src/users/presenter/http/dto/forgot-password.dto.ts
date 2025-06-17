import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPassWordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
