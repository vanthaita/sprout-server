import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDateString, IsNotEmpty, IsBoolean, IsEnum, IsArray, ValidateNested } from 'class-validator';
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
    position?: string;


    @IsOptional()
    @IsEnum(JobTypeEnum) 
    employmentType?: JobTypeEnum;
}

export class UpdateWorkExperienceDto extends PartialType(CreateWorkExperienceDto) {}


export class CreateWorkExperienceListDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateWorkExperienceDto)
    workExperiences: CreateWorkExperienceDto[];
}