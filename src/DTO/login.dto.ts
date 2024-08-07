import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsIn(['admin', 'vendor'])
  userType: 'admin' | 'vendor';
}
