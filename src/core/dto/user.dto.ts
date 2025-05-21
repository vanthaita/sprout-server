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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    maxLength: 255,
  })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @MaxLength(255)
  email: string;

  @ApiPropertyOptional({
    description: 'User password hash (optional)',
    minLength: 8,
    maxLength: 255,
    example: 'securePassword123!',
  })
  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(255) 
  passwordHash?: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    description: 'URL to user avatar image',
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    description: 'Type of user',
    enum: UserType,
    example: UserType.CANDIDATE,
  })
  @IsEnum(UserType)
  userType: UserType; 
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['passwordHash', 'email', 'userType'] as const)
) {
  @ApiPropertyOptional({
    description: 'Whether the user is active',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UserDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @Expose()
  @IsInt() 
  id: number;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @Expose()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Type of user',
    enum: UserType,
    example: UserType.CANDIDATE,
  })
  @Expose()
  @IsEnum(UserType)
  userType: UserType;

  @ApiProperty({
    description: 'Whether the user account is active',
    example: true,
  })
  @Expose()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Whether the user has completed onboarding',
    example: false,
  })
  @Expose()
  @IsBoolean()
  isOnboarded: boolean;

  @Exclude() 
  passwordHash?: string | null;

  @ApiProperty({
    description: 'Date when the user was created',
    type: 'string',
    format: 'date-time',
    example: '2023-01-01T00:00:00Z',
  })
  @Expose()
  @Type(() => Date) 
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
    type: 'string',
    format: 'date-time',
    example: '2023-01-01T00:00:00Z',
  })
  @Expose()
  @Type(() => Date) 
  updatedAt: Date;

  @Exclude()
  employer?: any; 

  @Exclude()
  candidate?: any;
}