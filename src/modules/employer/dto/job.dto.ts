import { 
  IsString, IsNotEmpty, IsOptional, IsEnum, 
  IsNumber,
} from 'class-validator';
import { ApplicationStatus, JobStatus, JobTypeEnum, Visibility } from 'generated/prisma';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    description: 'Title of the job',
    example: 'Senior Software Engineer',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Detailed job description',
    example: 'We are looking for an experienced software engineer...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'Job requirements',
    example: '5+ years of experience with Node.js and React',
  })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiPropertyOptional({
    description: 'Salary range description',
    example: '¥6,000,000 - ¥8,000,000 per year',
  })
  @IsString()
  @IsOptional()
  salaryRange?: string;

  @ApiPropertyOptional({
    description: 'Minimum salary',
    example: '6000000',
  })
  @IsString()
  @IsOptional()
  salaryMin: string;
  
  @ApiPropertyOptional({
    description: 'Primary tag/category for the job',
    example: 'Software Development',
  })
  @IsString()
  @IsOptional()
  primaryTag?: string;

  @ApiPropertyOptional({
    description: 'Maximum salary',
    example: '8000000',
  })
  @IsString()
  @IsOptional()
  salaryMax: string;

  @ApiPropertyOptional({
    description: 'Salary currency',
    example: 'JPY',
  })
  @IsString()
  @IsOptional()
  salaryCurrency: string;
  
  @ApiPropertyOptional({
    description: 'Salary period (yearly, monthly, hourly)',
    example: 'yearly',
  })
  @IsString()
  @IsOptional()
  salaryPeriod: string;
  
  @ApiPropertyOptional({
    description: 'Comma-separated tags for the job',
    example: 'Node.js,React,TypeScript',
  })
  @IsString()
  @IsOptional()
  tags: string;
  
  @ApiPropertyOptional({
    description: 'List of job benefits',
    type: [String],
    example: ['Health insurance', 'Flexible hours', 'Remote work'],
  })
  @IsString()
  @IsOptional()
  benefits?: string[];
  
  @ApiPropertyOptional({
    description: 'Job visibility',
    enum: Visibility,
    example: Visibility.PUBLIC,
  })
  @IsEnum(Visibility)
  @IsOptional()
  visibility?: Visibility;

  @ApiPropertyOptional({
    description: 'Job location',
    example: 'Tokyo, Japan',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    description: 'Type of job',
    enum: JobTypeEnum,
    example: JobTypeEnum.FULL_TIME,
  })
  @IsEnum(JobTypeEnum)
  @IsNotEmpty()
  jobType: JobTypeEnum;

  @ApiProperty({
    description: 'Job status',
    enum: JobStatus,
    default: JobStatus.PENDING,
  })
  status: JobStatus = JobStatus.PENDING;
}

export class UpdateJobDto {
  @ApiPropertyOptional({
    description: 'Title of the job',
    example: 'Senior Software Engineer (Updated)',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Detailed job description',
    example: 'Updated job description...',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Job requirements',
    example: 'Updated requirements...',
  })
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiPropertyOptional({
    description: 'Salary range description',
    example: '¥7,000,000 - ¥9,000,000 per year',
  })
  @IsString()
  @IsOptional()
  salaryRange?: string;

  @ApiPropertyOptional({
    description: 'Job location',
    example: 'Osaka, Japan',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    description: 'Type of job',
    enum: JobTypeEnum,
    example: JobTypeEnum.FULL_TIME,
  })
  @IsEnum(JobTypeEnum)
  @IsOptional()
  jobType?: JobTypeEnum;

  @ApiPropertyOptional({
    description: 'Job status',
    enum: JobStatus,
    example: JobStatus.APPROVED,
  })
  @IsEnum(JobStatus)
  @IsOptional()
  status?: JobStatus;
}

export class ApplicationInJobDto {
  @ApiProperty({
    description: 'Application ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Application status',
    enum: ApplicationStatus,
    example: ApplicationStatus.APPLICATION_SUBMITTED,
  })
  status: ApplicationStatus;

  @ApiProperty({
    description: 'Date when application was submitted',
    type: 'string',
    format: 'date-time',
  })
  applicationDate: Date;

  @ApiProperty({
    description: 'Candidate information',
    type: 'object',
    properties: {
      id: { type: 'number', example: 1 },
      name: { type: 'string', nullable: true, example: 'John Doe' },
    },
  })
  candidate: {
    id: number;
    name: string | null;
  };
}

export class JobResponseDto {
  @ApiProperty({
    description: 'Job ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Employer ID who posted the job',
    example: 1,
  })
  employerId: number;

  @ApiProperty({
    description: 'Job title',
    example: 'Senior Software Engineer',
  })
  title: string;

  @ApiProperty({
    description: 'Job description',
    example: 'Detailed job description...',
  })
  description: string;

  @ApiPropertyOptional({
    description: 'Job requirements',
    nullable: true,
    example: '5+ years of experience...',
  })
  requirements: string | null;

  @ApiPropertyOptional({
    description: 'Salary range',
    nullable: true,
    example: '¥6,000,000 - ¥8,000,000 per year',
  })
  salaryRange: string | null;

  @ApiPropertyOptional({
    description: 'Job location',
    nullable: true,
    example: 'Tokyo, Japan',
  })
  location: string | null;

  @ApiProperty({
    description: 'Job type',
    enum: JobTypeEnum,
    example: JobTypeEnum.FULL_TIME,
  })
  jobType: JobTypeEnum;

  @ApiProperty({
    description: 'Job status',
    enum: JobStatus,
    example: JobStatus.APPROVED,
  })
  status: JobStatus;

  @ApiProperty({
    description: 'Date when job was posted',
    type: 'string',
    format: 'date-time',
  })
  postedDate: Date;

  @ApiProperty({
    description: 'Date when job was created',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when job was last updated',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'List of applications for this job',
    type: [ApplicationInJobDto],
  })
  applications?: ApplicationInJobDto[];
  
  constructor(partial: Partial<JobResponseDto>) {
    Object.assign(this, partial);
  }
}

export class JobFilterDto {
  @ApiPropertyOptional({
    description: 'Search term for job title or description',
    example: 'software engineer',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by job types',
    enum: JobTypeEnum,
    isArray: true,
    example: [JobTypeEnum.FULL_TIME, JobTypeEnum.FREELANCE],
  })
  @IsOptional()
  @IsEnum(JobTypeEnum, { each: true })
  jobTypes?: JobTypeEnum[];

  @ApiPropertyOptional({
    description: 'Filter by job status',
    enum: JobStatus,
    example: JobStatus.APPROVED,
  })
  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @ApiPropertyOptional({
    description: 'Filter by employer ID',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  employerId?: number;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  limit?: number;
}