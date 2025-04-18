import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsDateString, IsNotEmpty, IsBoolean, IsEnum } from 'class-validator';
import { JobTypeEnum } from 'generated/prisma';

export class CreateWorkExperienceDto {
    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsBoolean()
    isCurrent?: boolean = false;

    @IsNotEmpty()
    @IsString()
    companyName: string;

    @IsOptional()
    @IsString()
    department?: string;

    @IsOptional()
    @IsString()
    jobTitle?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(JobTypeEnum) 
    employmentType?: JobTypeEnum;
}

export class UpdateWorkExperienceDto extends PartialType(CreateWorkExperienceDto) {}