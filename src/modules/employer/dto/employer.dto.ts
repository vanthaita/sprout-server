import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { UserType } from 'generated/prisma';
import { Exclude } from 'class-transformer';

export class CreateEmployerDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  // @IsString()
  // @IsNotEmpty()
  // password: string;

  // @IsString()
  // @IsNotEmpty()
  // fullName: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsUrl()
  @IsOptional()
  companyLogoUrl?: string;

  @IsString()
  companySize?: string;

  @IsString()
  address?: string;

  @IsString()
  industry?: string;

  @IsString()
  foudedYear?: string;

  @IsString()
  CompanyUrl?: string;

  @IsString()
  CompanyDesc?: string;

  // Default value will be set in service
  userType: UserType = UserType.EMPLOYER;
}

export class UpdateEmployerDto extends PartialType(CreateEmployerDto) {}

export class EmployerResponseDto {
  id: number;
  email: string;
  fullName: string;
  companyName: string;
  companyNameJp: string | null;
  companyLogoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  passwordHash: string;

  constructor(partial: Partial<EmployerResponseDto>) {
    Object.assign(this, partial);
  }
}

export class EmployerStatsDto {
  totalJobs: number;
  activeJobs: number;
  pendingJobs: number;
  totalApplications: number;
  recentApplications: number; 
}