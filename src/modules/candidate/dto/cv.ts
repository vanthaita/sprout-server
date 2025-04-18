import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsEnum, IsUrl } from 'class-validator';
import { FileTypeEnum } from 'generated/prisma';

export class CreateCVDto {
    @IsNotEmpty()
    @IsString()
    fileName: string;

    @IsNotEmpty()
    @IsUrl() 
    fileUrl: string;

    @IsOptional()
    @IsEnum(FileTypeEnum) 
    fileType?: FileTypeEnum;

    @IsOptional()
    @IsString()
    language?: string;

    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean = false;
}

export class UpdateCVDto extends PartialType(CreateCVDto) {}