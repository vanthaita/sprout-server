import {
  IsString, IsOptional, MaxLength, IsEnum, IsUrl,IsISO8601
} from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { GenderType  } from 'generated/prisma'; 
import { PartialType } from '@nestjs/mapped-types';

export class CreateCandidateDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @IsOptional()
  @IsISO8601({ strict: true }, { message: 'dateOfBirth must be a valid ISO 8601 date string (YYYY-MM-DD)' })
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(GenderType)
  gender?: GenderType;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  profilePhotoUrl?: string;

  @IsOptional()
  @IsString()
  motivation?: string;

  @IsOptional()
  @IsString()
  skills?: string;
}

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {}

export class CandidateDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  fullName?: string | null;

  @Expose()
  dateOfBirth?: string | null;

  @Expose()
  gender?: GenderType | null;

  @Expose()
  address?: string | null;

  @Expose()
  phoneNumber?: string | null;

  @Expose()
  profilePhotoUrl?: string | null;

  @Expose()
  motivation?: string | null;

  @Expose()
  skills?: string | null;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;

  @Exclude()
  user?: any;
  @Exclude()
  education?: any[];
  @Exclude()
  workExperience?: any[];
  @Exclude()
  applications?: any[];
  @Exclude()
  CV?: any[];
}