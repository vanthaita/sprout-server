import { ApplicationStatus } from "generated/prisma";
import { IsOptional, IsEnum, IsNumber } from 'class-validator';
export class ApplicationResponseDto {
    id: number;
    candidateId: number;
    jobId: number;
    cvId: number;
    applicationDate: Date;
    status: ApplicationStatus;
    coverLetter: string | null;
    createdAt: Date;
    updatedAt: Date;

    // Candidate info (to be populated in service)
    candidateName?: string;
    candidateEmail?: string;
    cvUrl?: string;

    constructor(partial: Partial<ApplicationResponseDto>) {
        Object.assign(this, partial);
    }
}

export class UpdateApplicationStatusDto {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}

export class ApplicationFilterDto {
    @IsOptional()
    @IsNumber()
    jobId?: number;
  
    @IsOptional()
    @IsEnum(ApplicationStatus)
    status?: ApplicationStatus;
  
    @IsOptional()
    @IsNumber()
    page?: number;
  
    @IsOptional()
    @IsNumber()
    limit?: number;
}