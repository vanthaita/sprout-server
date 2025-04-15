import { PartialType, OmitType } from '@nestjs/mapped-types';
import {
  IsInt, IsOptional, IsString, MaxLength, IsEnum, IsDate, IsEmail, MinLength, IsBoolean, IsUrl, 
} from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';
import { UserType } from 'generated/prisma';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8) 
  @MaxLength(255)
  password: string; 
  @IsString()
  @MaxLength(100)
  fullName: string;

  @IsOptional()
  // @IsPhoneNumber(null) // Specify region if needed, e.g., 'VN'
  @MaxLength(20)
  phoneNumber?: string;

  @IsEnum(UserType)
  userType: UserType;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  avatarUrl?: string;
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
  phoneNumber?: string | null;

  @Expose()
  @IsEnum(UserType)
  userType: UserType;

  @Expose()
  avatarUrl?: string | null;

  @Expose()
  @IsBoolean()
  isActive: boolean;

  @Expose()
  @IsBoolean()
  isEmailVerified: boolean;

  @Exclude() // Exclude sensitive data
  passwordHash: string;

  @Exclude()
  emailVerifyToken?: string | null;

  @Exclude()
  passwordResetToken?: string | null;

  @Exclude()
  passwordResetExpires?: Date | null;

  @Expose()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  lastLogin?: Date | null;

  @Expose()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;

  // Optionally include nested DTOs (can cause circular dependencies if not handled carefully)
  // @Expose()
  // @Type(() => EmployerDto)
  // @IsOptional()
  // employer?: EmployerDto | null;

  // @Expose()
  // @Type(() => CandidateDto)
  // @IsOptional()
  // candidate?: CandidateDto | null;
}