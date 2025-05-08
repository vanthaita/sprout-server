import { IsEmail, IsString, IsNotEmpty, Matches, IsEnum } from 'class-validator';
import { UserType } from '../../../../generated/prisma/client';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must be at least 8 characters with letters and numbers',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;
}