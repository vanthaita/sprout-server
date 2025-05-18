import { IsDateString, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateInterviewDto {
  @IsInt()
  jobId: number;

  @IsInt()
  candidateId: number;

  @IsInt()
  employerId: number;

  @IsString()
  title: string;

  @IsDateString()
  scheduledAt: string;

  @IsInt()
  @Min(15)
  @Max(240)
  durationMinutes: number;

  @IsString()
  @IsOptional()
  meetingLink?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateInterviewDto {
  @IsDateString()
  @IsOptional()
  scheduledAt?: string;

  @IsInt()
  @Min(15)
  @Max(240)
  @IsOptional()
  durationMinutes?: number;

  @IsString()
  @IsOptional()
  meetingLink?: string;

  @IsString()
  @IsOptional()
  status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

  @IsString()
  @IsOptional()
  feedback?: string;
}

export class InterviewResponseDto {
  id: number;
  job: {
    id: number;
    title: string;
  };
  candidate: {
    id: number;
    name: string;
    profilePhoto?: string;
  };
  employer: {
    id: number;
    companyName: string;
    logo?: string;
  };
  title: string;
  scheduledAt: string;
  durationMinutes: number;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}