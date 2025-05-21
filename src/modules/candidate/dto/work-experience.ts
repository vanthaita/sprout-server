import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDateString, IsNotEmpty, IsBoolean, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { JobTypeEnum } from 'generated/prisma';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkExperienceDto {
  @ApiProperty({
    description: 'Start date of employment (ISO 8601 format)',
    example: '2020-01-15',
    type: String
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({
    description: 'End date of employment (ISO 8601 format), required if isCurrent is false',
    example: '2022-12-31',
    type: String
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Indicates if this is the current employment',
    example: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean = false;

  @ApiProperty({
    description: 'Name of the company or organization',
    example: 'Acme Corporation'
  })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiPropertyOptional({
    description: 'Job title or position held',
    example: 'Senior Software Engineer'
  })
  @IsOptional()
  @IsString()
  position?: string;

  @ApiPropertyOptional({
    description: 'Type of employment',
    enum: JobTypeEnum,
    example: JobTypeEnum.FULL_TIME
  })
  @IsOptional()
  @IsEnum(JobTypeEnum)
  employmentType?: JobTypeEnum;
}

export class UpdateWorkExperienceDto extends PartialType(CreateWorkExperienceDto) {}

export class CreateWorkExperienceListDto {
  @ApiProperty({
    description: 'Array of work experience records',
    type: [CreateWorkExperienceDto],
    example: [{
      startDate: '2020-01-15',
      endDate: '2022-12-31',
      isCurrent: false,
      companyName: 'Acme Corporation',
      position: 'Senior Software Engineer',
      employmentType: JobTypeEnum.FULL_TIME
    }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkExperienceDto)
  workExperiences: CreateWorkExperienceDto[];
}