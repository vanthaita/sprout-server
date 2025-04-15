
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';
import { ProficiencyLevel } from 'generated/prisma';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;
}

export class SocialProfileDto {
    @IsString()
    platform: string;

    @IsUrl()
    url: string;
}

export class OtherLanguageDto {
    @IsString()
    language: string;

    @IsEnum(ProficiencyLevel)
    proficiency: ProficiencyLevel;
}