import { 
  IsString, IsNotEmpty, IsOptional, IsEnum, 
  IsNumber
} from 'class-validator';
import { ApplicationStatus, JobStatus, JobTypeEnum } from 'generated/prisma';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  requirements?: string;

  @IsString()
  @IsOptional()
  salaryRange?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(JobTypeEnum)
  @IsNotEmpty()
  jobType: JobTypeEnum;

  // Default values
  status: JobStatus = JobStatus.PENDING;
}

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  requirements?: string;

  @IsString()
  @IsOptional()
  salaryRange?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(JobTypeEnum)
  @IsOptional()
  jobType?: JobTypeEnum;

  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;
}

export class ApplicationInJobDto {
  id: number;
  status: ApplicationStatus;
  applicationDate: Date;
  candidate: {
    id: number;
    name: string | null;
  };
}

export class JobResponseDto {
  id: number;
  employerId: number;
  title: string;
  description: string;
  requirements: string | null;
  salaryRange: string | null;
  location: string | null;
  jobType: JobTypeEnum;
  status: JobStatus;
  postedDate: Date;
  createdAt: Date;
  updatedAt: Date;
  applications?: ApplicationInJobDto[];
  
  constructor(partial: Partial<JobResponseDto>) {
    Object.assign(this, partial);
  }
}

export class JobFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(JobTypeEnum, { each: true })
  jobTypes?: JobTypeEnum[];

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @IsOptional()
  @IsNumber()
  employerId?: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}