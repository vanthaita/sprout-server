import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';
import { UserType } from 'generated/prisma';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @MaxLength(255)
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(255) 
  password?: string;

  @IsString()
  @MaxLength(100)
  fullName: string;

  @IsEnum(UserType)
  userType: UserType; 
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email', 'userType'] as const)
) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UserDto {
  @Expose()
  @IsInt() 
  id: number;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  fullName: string;

  @Expose()
  @IsEnum(UserType)
  userType: UserType;

  @Expose()
  @IsBoolean()
  isActive: boolean;

  @Exclude() 
  passwordHash?: string | null;

  @Expose()
  @Type(() => Date) 
  createdAt: Date;

  @Expose()
  @Type(() => Date) 
  updatedAt: Date;

  @Exclude()
  employer?: any; 

  @Exclude()
  candidate?: any;
}