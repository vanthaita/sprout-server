import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';
import { UserType } from 'src/core/enums/user-type.enum';

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