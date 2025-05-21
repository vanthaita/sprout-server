import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDateString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEducationDto {
  @ApiProperty({
    description: 'Start date of education in ISO format (YYYY-MM-DD)',
    example: '2020-09-01',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({
    description: 'End date of education in ISO format (YYYY-MM-DD)',
    example: '2024-06-30',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    description: 'Name of the educational institution',
    example: 'University of Technology',
  })
  @IsNotEmpty()
  @IsString()
  schoolName: string;

  @ApiPropertyOptional({
    description: 'Faculty or college within the institution',
    example: 'Faculty of Computer Science',
  })
  @IsOptional()
  @IsString()
  faculty?: string;

  @ApiPropertyOptional({
    description: 'Specific department or program',
    example: 'Department of Artificial Intelligence',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Degree obtained or being pursued',
    example: 'Bachelor of Science',
  })
  @IsOptional()
  @IsString()
  degree?: string;
}

export class UpdateEducationDto extends PartialType(CreateEducationDto) {}

export class CreateEducationListDto {
  @ApiProperty({
    description: 'Array of education records',
    type: [CreateEducationDto],
    example: [
      {
        startDate: '2020-09-01',
        endDate: '2024-06-30',
        schoolName: 'University of Technology',
        faculty: 'Faculty of Computer Science',
        degree: 'Bachelor of Science'
      }
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEducationDto)
  educations: CreateEducationDto[];
}