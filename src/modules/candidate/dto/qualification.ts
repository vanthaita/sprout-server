import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateQualificationDto {
    @IsNotEmpty()
    @IsDateString()
    issueDate: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    status?: string;
}

export class UpdateQualificationDto extends PartialType(CreateQualificationDto) {}