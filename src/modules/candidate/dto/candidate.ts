import {
  IsString, IsOptional, MaxLength, IsEnum, IsUrl, IsISO8601
} from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { GenderType } from 'generated/prisma';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCandidateDto {
  @ApiPropertyOptional({
    description: 'Candidate full name',
    maxLength: 100,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @ApiPropertyOptional({
    description: 'Date of birth in ISO 8601 format (YYYY-MM-DD)',
    example: '1990-01-15',
  })
  @IsOptional()
  @IsISO8601({ strict: true }, { message: 'dateOfBirth must be a valid ISO 8601 date string (YYYY-MM-DD)' })
  dateOfBirth?: string;

  @ApiPropertyOptional({
    description: 'Gender of the candidate',
    enum: GenderType,
    example: GenderType.MALE,
  })
  @IsOptional()
  @IsEnum(GenderType)
  gender?: GenderType;

  @ApiPropertyOptional({
    description: 'Current address of the candidate',
    example: '123 Main St, City, Country',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'Contact phone number',
    maxLength: 20,
    example: '+1234567890',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'URL to candidate profile photo',
    maxLength: 255,
    example: 'https://example.com/profile.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  profilePhotoUrl?: string;

  @ApiPropertyOptional({
    description: 'Candidate motivation statement',
    example: 'Passionate about creating innovative solutions...',
  })
  @IsOptional()
  @IsString()
  motivation?: string;

  @ApiPropertyOptional({
    description: 'Candidate skills (comma-separated or as a list)',
    example: 'JavaScript, React, Node.js',
  })
  @IsOptional()
  @IsString()
  skills?: string;
}

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {}

export class CandidateDto {
  @ApiProperty({
    description: 'Candidate ID',
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Associated user ID',
    example: 1,
  })
  @Expose()
  userId: number;

  @ApiPropertyOptional({
    description: 'Candidate full name',
    example: 'John Doe',
    nullable: true,
  })
  @Expose()
  fullName?: string | null;

  @ApiPropertyOptional({
    description: 'Date of birth in ISO 8601 format (YYYY-MM-DD)',
    example: '1990-01-15',
    nullable: true,
  })
  @Expose()
  dateOfBirth?: string | null;

  @ApiPropertyOptional({
    description: 'Gender of the candidate',
    enum: GenderType,
    example: GenderType.MALE,
    nullable: true,
  })
  @Expose()
  gender?: GenderType | null;

  @ApiPropertyOptional({
    description: 'Current address of the candidate',
    example: '123 Main St, City, Country',
    nullable: true,
  })
  @Expose()
  address?: string | null;

  @ApiPropertyOptional({
    description: 'Contact phone number',
    example: '+1234567890',
    nullable: true,
  })
  @Expose()
  phoneNumber?: string | null;

  @ApiPropertyOptional({
    description: 'URL to candidate profile photo',
    example: 'https://example.com/profile.jpg',
    nullable: true,
  })
  @Expose()
  profilePhotoUrl?: string | null;

  @ApiPropertyOptional({
    description: 'Candidate motivation statement',
    example: 'Passionate about creating innovative solutions...',
    nullable: true,
  })
  @Expose()
  motivation?: string | null;

  @ApiPropertyOptional({
    description: 'Candidate skills',
    example: 'JavaScript, React, Node.js',
    nullable: true,
  })
  @Expose()
  skills?: string | null;

  @ApiProperty({
    description: 'Creation timestamp',
    type: 'string',
    format: 'date-time',
    example: '2023-01-01T00:00:00Z',
  })
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    type: 'string',
    format: 'date-time',
    example: '2023-01-01T00:00:00Z',
  })
  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @Exclude()
  user?: any;

  @Exclude()
  education?: any[];

  @Exclude()
  workExperience?: any[];

  @Exclude()
  applications?: any[];

  @Exclude()
  CV?: any[];
}