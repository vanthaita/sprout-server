import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

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
    degreeOrStatus?: string;
}

export class UpdateEducationDto extends PartialType(CreateEducationDto) {}