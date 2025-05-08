import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { FileTypeEnum } from '../../../../generated/prisma/client';

export class CreateCVDto {
  @IsString()
  @IsOptional()
  fileName?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsEnum(FileTypeEnum)
  @IsOptional()
  fileType?: FileTypeEnum;

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class UpdateCVDto extends PartialType(CreateCVDto) {
  @IsString()
  @IsOptional()
  fileName?: string;

  @IsString()
  @IsOptional()
  fileUrl?: string;

  @IsEnum(FileTypeEnum)
  @IsOptional()
  fileType?: FileTypeEnum;

  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}