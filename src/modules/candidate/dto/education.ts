import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDateString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';

export class CreateEducationDto {
    @IsNotEmpty()
    @IsDateString()
    startDate: string; 

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsNotEmpty()
    @IsString()
    schoolName: string;

    @IsOptional()
    @IsString()
    faculty?: string;

    @IsOptional()
    @IsString() 
    department?: string;

    @IsOptional()
    @IsString()
    degree?: string;
}

export class UpdateEducationDto extends PartialType(CreateEducationDto) {}

export class CreateEducationListDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateEducationDto)
    educations: CreateEducationDto[];
}