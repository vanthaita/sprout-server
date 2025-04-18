import { 
    IsString, IsNotEmpty, IsOptional, IsEnum, IsDate, 
    IsNumber
  } from 'class-validator';
import { ApplicationStatus, JapaneseProficiencyLevel, JobStatus, JobTypeEnum } from 'generated/prisma';

  
  export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsOptional()
    titleJp?: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsString()
    @IsOptional()
    requirements?: string;
  
    @IsString()
    @IsOptional()
    salaryDetails?: string;
  
    @IsString()
    @IsOptional()
    workLocation?: string;
  
    @IsString()
    @IsOptional()
    workingHours?: string;
  
    @IsEnum(JobTypeEnum)
    @IsNotEmpty()
    jobType: JobTypeEnum;
  
    @IsEnum(JapaneseProficiencyLevel)
    @IsOptional()
    requiredJapaneseLevel?: JapaneseProficiencyLevel;
  
    @IsDate()
    @IsOptional()
    expiryDate?: Date;
  
    // Default values
    status: JobStatus = JobStatus.PENDING;
}

export class UpdateJobDto {
    @IsString()
    @IsOptional()
    title?: string;
  
    @IsString()
    @IsOptional()
    titleJp?: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsString()
    @IsOptional()
    requirements?: string;
  
    @IsString()
    @IsOptional()
    salaryDetails?: string;
  
    @IsString()
    @IsOptional()
    workLocation?: string;
  
    @IsString()
    @IsOptional()
    workingHours?: string;
  
    @IsEnum(JobTypeEnum)
    @IsOptional()
    jobType?: JobTypeEnum;
  
    @IsEnum(JapaneseProficiencyLevel)
    @IsOptional()
    requiredJapaneseLevel?: JapaneseProficiencyLevel;
  
    @IsEnum(JobStatus)
    @IsOptional()
    status?: JobStatus;
  
    @IsDate()
    @IsOptional()
    expiryDate?: Date;
}
export class ApplicationInJobDto {
    id: number;
    status: ApplicationStatus;
    applicationDate: Date;
    candidate: {
      id: number;
      name: string;
      japaneseLevel: JapaneseProficiencyLevel | null;
    };
  }
export class JobResponseDto {
    id: number;
    employerId: number;
    title: string;
    titleJp: string | null;
    description: string;
    requirements: string | null;
    salaryDetails: string | null;
    workLocation: string | null;
    workingHours: string | null;
    jobType: JobTypeEnum;
    requiredJapaneseLevel: JapaneseProficiencyLevel | null;
    status: JobStatus;
    postedDate: Date;
    expiryDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    applications?: ApplicationInJobDto[]
    
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
    @IsEnum(JapaneseProficiencyLevel)
    japaneseLevel?: JapaneseProficiencyLevel;
  
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