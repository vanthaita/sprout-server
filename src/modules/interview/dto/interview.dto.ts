import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInterviewDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  jobId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  candidateId: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  employerId: number;

  @ApiProperty({ example: 'Technical Interview' })
  @IsString()
  title: string;

  @ApiProperty({ example: '2025-06-01T10:00:00Z' })
  @IsDateString()
  scheduledAt: string;

  @ApiProperty({ example: 60, minimum: 15, maximum: 240 })
  @IsInt()
  @Min(15)
  @Max(240)
  durationMinutes: number;

  @ApiPropertyOptional({ example: 'https://meet.example.com/interview123' })
  @IsString()
  @IsOptional()
  meetingLink?: string;

  @ApiPropertyOptional({ example: 'Bring resume and portfolio.' })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateInterviewDto {
  @ApiPropertyOptional({ example: '2025-06-01T10:00:00Z' })
  @IsDateString()
  @IsOptional()
  scheduledAt?: string;

  @ApiPropertyOptional({ example: 90, minimum: 15, maximum: 240 })
  @IsInt()
  @Min(15)
  @Max(240)
  @IsOptional()
  durationMinutes?: number;

  @ApiPropertyOptional({ example: 'https://meet.example.com/interview123' })
  @IsString()
  @IsOptional()
  meetingLink?: string;

  @ApiPropertyOptional({ example: 'COMPLETED', enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'] })
  @IsString()
  @IsOptional()
  status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

  @ApiPropertyOptional({ example: 'Candidate showed excellent communication skills.' })
  @IsString()
  @IsOptional()
  feedback?: string;
}

export class InterviewResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({
    example: { id: 101, title: 'Frontend Developer' },
  })
  job: {
    id: number;
    title: string;
  };

  @ApiProperty({
    example: { id: 201, name: 'Alice Doe', profilePhoto: 'https://example.com/photo.jpg' },
  })
  candidate: {
    id: number;
    name: string;
    profilePhoto?: string;
  };

  @ApiProperty({
    example: { id: 301, companyName: 'Tech Corp', logo: 'https://example.com/logo.png' },
  })
  employer: {
    id: number;
    companyName: string;
    logo?: string;
  };

  @ApiProperty({ example: 'Initial Interview' })
  title: string;

  @ApiProperty({ example: '2025-06-01T10:00:00Z' })
  scheduledAt: string;

  @ApiProperty({ example: 60 })
  durationMinutes: number;

  @ApiProperty({ example: 'SCHEDULED', enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'] })
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

  @ApiPropertyOptional({ example: 'https://meet.example.com/room456' })
  meetingLink?: string;

  @ApiProperty({ example: '2025-05-20T12:34:56Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-05-20T12:34:56Z' })
  updatedAt: string;
}
