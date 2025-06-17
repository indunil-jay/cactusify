import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least $constraint1 characters long.',
  })
  @MaxLength(20, {
    message: 'Password cannot exceed $constraint1 characters.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must include at least 1 letter, 1 number, and 1 special character.',
  })
  password: string;
}
