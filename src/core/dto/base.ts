import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';
import { ProficiencyLevel } from 'generated/prisma';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Page number (1 based)',
    minimum: 1,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    minimum: 1,
    default: 10,
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;
}

export class SocialProfileDto {
  @ApiProperty({
    description: 'Social media platform name',
    example: 'Twitter',
  })
  @IsString()
  platform: string;

  @ApiProperty({
    description: 'Profile URL',
    example: 'https://twitter.com/username',
  })
  @IsUrl()
  url: string;

  @ApiPropertyOptional({
    description: 'Username on the platform',
    example: 'username',
  })
  @IsOptional()
  @IsString()
  username?: string;
}

export class OtherLanguageDto {
  @ApiProperty({
    description: 'Language name',
    example: 'Spanish',
  })
  @IsString()
  language: string;

  @ApiProperty({
    description: 'Proficiency level in the language',
    enum: ProficiencyLevel,
    example: ProficiencyLevel.INTERMEDIATE,
  })
  @IsEnum(ProficiencyLevel)
  proficiency: ProficiencyLevel;
}

export class TimestampDto {
  @ApiProperty({
    description: 'Creation timestamp',
    type: 'string',
    format: 'date-time',
    example: '2023-01-01T00:00:00Z',
  })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    type: 'string',
    format: 'date-time',
    example: '2023-01-01T00:00:00Z',
  })
  @Type(() => Date)
  updatedAt: Date;
}

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Current page number',
    example: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
  })
  limit?: number;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Array of paginated items',
    type: 'array',
    items: { type: 'object' },
  })
  data: T[];

  @ApiProperty({
    description: 'Total number of items',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;
}