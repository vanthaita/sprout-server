import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsEnum, IsUrl } from 'class-validator';
import { FileTypeEnum } from 'generated/prisma';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCVDto {
  @ApiProperty({
    description: 'The name of the CV file',
    example: 'my_cv.pdf',
  })
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @ApiProperty({
    description: 'URL where the CV file is stored',
    example: 'https://example.com/cvs/my_cv.pdf',
  })
  @IsNotEmpty()
  @IsUrl() 
  fileUrl: string;

  @ApiPropertyOptional({
    description: 'Type of the file',
    enum: FileTypeEnum,
    example: FileTypeEnum.PDF,
  })
  @IsOptional()
  @IsEnum(FileTypeEnum) 
  fileType?: FileTypeEnum;

  @ApiPropertyOptional({
    description: 'Language of the CV',
    example: 'en',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({
    description: 'Whether this CV is the primary one',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean = false;
}

export class UpdateCVDto extends PartialType(CreateCVDto) {}