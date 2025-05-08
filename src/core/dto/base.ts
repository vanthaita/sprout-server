import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';

// Giả định ProficiencyLevel được định nghĩa
enum ProficiencyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
  NATIVE = 'NATIVE',
}

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;
}

export class SocialProfileDto {
  @IsString()
  platform: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  username?: string;
}

export class OtherLanguageDto {
  @IsString()
  language: string;

  @IsEnum(ProficiencyLevel)
  proficiency: ProficiencyLevel;
}

export class TimestampDto {
  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;
}

export class PaginationDto {
  page?: number;
  limit?: number;
}

export class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}