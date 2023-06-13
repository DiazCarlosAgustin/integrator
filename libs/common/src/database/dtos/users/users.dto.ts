/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UsersDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
