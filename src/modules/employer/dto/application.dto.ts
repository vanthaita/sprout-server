import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationStatus } from 'generated/prisma';
import { IsOptional, IsEnum, IsInt,  } from 'class-validator';

export class ApplicationResponseDto {
  @ApiProperty({ description: 'Application ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Candidate ID', example: 123 })
  candidateId: number;

  @ApiProperty({ description: 'Job ID', example: 456 })
  jobId: number;

  @ApiProperty({ description: 'CV ID associated with the application', example: 789 })
  cvId: number;

  @ApiProperty({ 
    description: 'Date when application was submitted', 
    example: '2023-05-15T10:00:00Z' 
  })
  applicationDate: Date;

  @ApiProperty({ 
    enum: ApplicationStatus,
    description: 'Current status of the application',
    example: ApplicationStatus.APPLICATION_SUBMITTED
  })
  status: ApplicationStatus;

  @ApiPropertyOptional({ 
    description: 'Cover letter text', 
    example: 'I am excited to apply for this position...',
    nullable: true 
  })
  coverLetter: string | null;

  @ApiProperty({ 
    description: 'Creation timestamp', 
    example: '2023-05-15T10:00:00Z' 
  })
  createdAt: Date;

  @ApiProperty({ 
    description: 'Last update timestamp', 
    example: '2023-05-16T11:30:00Z' 
  })
  updatedAt: Date;

  @ApiPropertyOptional({ 
    description: 'Candidate full name', 
    example: 'John Doe' 
  })
  candidateName?: string;

  @ApiPropertyOptional({ 
    description: 'Candidate email', 
    example: 'john.doe@example.com' 
  })
  candidateEmail?: string;

  @ApiPropertyOptional({ 
    description: 'URL to the candidate CV', 
    example: 'https://example.com/cvs/john_doe.pdf' 
  })
  cvUrl?: string;

  constructor(partial: Partial<ApplicationResponseDto>) {
    Object.assign(this, partial);
  }
}

export class UpdateApplicationStatusDto {
  @ApiProperty({
    enum: ApplicationStatus,
    description: 'New status for the application',
    example: ApplicationStatus.FIRST_INTERVIEW
  })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}

export class ApplicationFilterDto {
  @ApiPropertyOptional({ 
    description: 'Filter by specific job ID',
    example: 456,
    type: Number 
  })
  @IsOptional()
  @IsInt()
  jobId?: number;

  @ApiPropertyOptional({ 
    enum: ApplicationStatus,
    description: 'Filter by application status',
    example: ApplicationStatus.DOCUMENT_SCREENING
  })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @ApiPropertyOptional({ 
    description: 'Page number for pagination (1-based)',
    example: 1,
    default: 1 
  })
  @IsOptional()
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ 
    description: 'Number of items per page',
    example: 10,
    default: 10 
  })
  @IsOptional()
  @IsInt()
  limit?: number = 10;
}