import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  mobile: number;

  @IsString()
  @IsNotEmpty()
  password: string;
}
