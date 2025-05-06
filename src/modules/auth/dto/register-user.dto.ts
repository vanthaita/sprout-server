import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';
import UserType from '../../../core/enums/user.type';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  fullName: string;

  @IsEnum(UserType)
  userType: UserType;
}