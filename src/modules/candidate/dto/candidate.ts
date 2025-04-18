import {
  IsString, IsOptional, MaxLength, IsEnum, IsArray, IsUrl, ValidateNested, IsISO8601, IsObject
} from 'class-validator';
import { Type, Exclude, Expose } from 'class-transformer';
import { GenderType, JapaneseProficiencyLevel, ProficiencyLevel } from 'generated/prisma'; 
import { PartialType } from '@nestjs/mapped-types';

export class OtherLanguageDto {
  @IsString()
  language: string;

  @IsEnum(ProficiencyLevel)
  proficiency: ProficiencyLevel;
}

export class CreateCandidateDto {

  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullNameKanji?: string; 

  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullNameKana?: string; 

  @IsOptional()
  @IsISO8601({ strict: true }, { message: 'dateOfBirth must be a valid ISO 8601 date string (YYYY-MM-DD)' })
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(GenderType)
  gender?: GenderType;

  @IsOptional()
  @IsString()
  currentAddressJp?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string; 

  @IsOptional()
  @IsString() 
  @MaxLength(255)
  email?: string; 

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  profilePhotoUrl?: string;

  @IsOptional()
  @IsString()
  motivation?: string; 

  @IsOptional()
  @IsString()
  selfPromotion?: string; 

  @IsOptional()
  @IsString()
  hobbies?: string; 

  @IsOptional()
  @IsString()
  candidateRequests?: string; 

  @IsOptional()
  @IsEnum(JapaneseProficiencyLevel)
  japaneseProficiency?: JapaneseProficiencyLevel;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OtherLanguageDto)
  @IsObject({ each: true })
  otherLanguages?: OtherLanguageDto[]; 
}

export class UpdateCandidateDto extends PartialType(CreateCandidateDto) {}


export class CandidateDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  // --- Basic Info (基本情報) ---
  @Expose()
  fullNameKanji?: string | null;

  @Expose()
  fullNameKana?: string | null;

  @Expose()
  @IsISO8601({ strict: true })
  dateOfBirth?: string | null;

  @Expose()
  gender?: GenderType | null;

  @Expose()
  currentAddressJp?: string | null;

  @Expose()
  phoneNumber?: string | null;

  @Expose()
  email?: string | null;

  @Expose()
  profilePhotoUrl?: string | null;


  @Expose()
  motivation?: string | null;

  @Expose()
  selfPromotion?: string | null;

  @Expose()
  hobbies?: string | null;

  @Expose()
  candidateRequests?: string | null;

  @Expose()
  japaneseProficiency?: JapaneseProficiencyLevel | null;

  @Expose()
  @Type(() => OtherLanguageDto) 
  otherLanguages?: OtherLanguageDto[] | null; 

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
  qualifications?: any[];
  @Exclude()
  cvs?: any[];
  @Exclude()
  applications?: any[];
}