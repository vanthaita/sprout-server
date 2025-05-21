import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { UserType } from 'generated/prisma';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployerDto {
  @ApiProperty({
    description: 'Email address of the employer',
    example: 'employer@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Name of the company',
    example: 'Acme Inc',
  })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiPropertyOptional({
    description: 'URL of the company logo',
    example: 'https://example.com/logo.png',
  })
  @IsUrl()
  @IsOptional()
  companyLogoUrl?: string;

  @ApiPropertyOptional({
    description: 'Size of the company',
    example: '50-100 employees',
  })
  @IsString()
  @IsOptional()
  companySize?: string;

  @ApiPropertyOptional({
    description: 'Company address',
    example: '123 Main St, Tokyo, Japan',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    description: 'Industry the company operates in',
    example: 'Information Technology',
  })
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiPropertyOptional({
    description: 'Year the company was founded',
    example: '2010',
  })
  @IsString()
  @IsOptional()
  foundedYear?: string;

  @ApiPropertyOptional({
    description: 'Company website URL',
    example: 'https://acme.com',
  })
  @IsString()
  @IsOptional()
  CompanyUrl?: string;

  @ApiPropertyOptional({
    description: 'Company description',
    example: 'A leading tech company specializing in innovative solutions',
  })
  @IsString()
  @IsOptional()
  CompanyDesc?: string;

  // Default value will be set in service
  @ApiProperty({
    description: 'Type of user',
    enum: UserType,
    default: UserType.EMPLOYER,
  })
  userType: UserType = UserType.EMPLOYER;
}

export class UpdateEmployerDto extends PartialType(CreateEmployerDto) {}

export class EmployerResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the employer',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Email address of the employer',
    example: 'employer@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Full name of the employer',
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty({
    description: 'Name of the company',
    example: 'Acme Inc',
  })
  companyName: string;

  @ApiPropertyOptional({
    description: 'Japanese name of the company',
    nullable: true,
    example: '株式会社エイクミー',
  })
  companyNameJp: string | null;

  @ApiPropertyOptional({
    description: 'URL of the company logo',
    nullable: true,
    example: 'https://example.com/logo.png',
  })
  companyLogoUrl: string | null;

  @ApiProperty({
    description: 'Date when the employer account was created',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the employer account was last updated',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;

  @Exclude()
  passwordHash: string;

  constructor(partial: Partial<EmployerResponseDto>) {
    Object.assign(this, partial);
  }
}

export class EmployerStatsDto {
  @ApiProperty({
    description: 'Total number of jobs posted by the employer',
    example: 10,
  })
  totalJobs: number;

  @ApiProperty({
    description: 'Number of currently active jobs',
    example: 5,
  })
  activeJobs: number;

  @ApiProperty({
    description: 'Number of jobs pending approval',
    example: 2,
  })
  pendingJobs: number;

  @ApiProperty({
    description: 'Total number of applications received',
    example: 50,
  })
  totalApplications: number;

  @ApiProperty({
    description: 'Number of recent applications (e.g., in the last 7 days)',
    example: 5,
  })
  recentApplications: number; 
}