import {
  Controller,
  Post,
  Patch,
  Delete, 
  Get,
  Body,
  Param,
  Request,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { AuthGuard as JWTAuthGuard } from '../../core/guard/authenticated.guard';
import { AuthenticatedRequest } from '../../core/type/interface'; 
import { CreateCandidateDto, UpdateCandidateDto } from './dto/candidate';
import { CreateEducationDto, UpdateEducationDto } from './dto/education';
import { CreateWorkExperienceDto, UpdateWorkExperienceDto } from './dto/work-experience';
// import { CreateQualificationDto, UpdateQualificationDto } from './dto/qualification';
import { CreateCVDto, UpdateCVDto } from './dto/cv';

@Controller('candidate')
@UseGuards(JWTAuthGuard) 
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}


  @Get('profile') 
  getCandidateProfile( 
      @Request() req: AuthenticatedRequest,
  ) {
      return this.candidateService.candidateProfileDetails(req.user.email);
  }

  @Post('profile')
  createCandidateProfile(
      @Request() req: AuthenticatedRequest,
      @Body() createCandidateDto: CreateCandidateDto
  ) {
      return this.candidateService.createCandidateProfile(req.user.email, createCandidateDto);
  }

  @Patch('profile') 
  updateCandidateProfile(
      @Request() req: AuthenticatedRequest,
      @Body() updateCandidateDto: UpdateCandidateDto
  ) {
      return this.candidateService.updateCandidateProfile(req.user.email, updateCandidateDto);
  }


  @Post('education')
  addEducation(
      @Request() req: AuthenticatedRequest,
      @Body() createEducationDto: CreateEducationDto
  ) {
      return this.candidateService.addEducation(req.user.email, createEducationDto);
  }

  @Patch('education/:id')
  updateEducation(
      @Request() req: AuthenticatedRequest,
      @Param('id', ParseIntPipe) educationId: number,
      @Body() updateEducationDto: UpdateEducationDto
  ) {
      return this.candidateService.updateEducation(req.user.email, educationId, updateEducationDto);
  }

  @Delete('education/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteEducation(
      @Request() req: AuthenticatedRequest,
      @Param('id', ParseIntPipe) educationId: number,
  ) {
      return this.candidateService.deleteEducation(req.user.email, educationId);
  }


  @Post('work-experience')
  addWorkExperience(
      @Request() req: AuthenticatedRequest,
      @Body() createWorkExperienceDto: CreateWorkExperienceDto
  ) {
      return this.candidateService.addWorkExperience(req.user.email, createWorkExperienceDto);
  }

  @Patch('work-experience/:id')
  updateWorkExperience(
      @Request() req: AuthenticatedRequest,
      @Param('id', ParseIntPipe) experienceId: number,
      @Body() updateWorkExperienceDto: UpdateWorkExperienceDto
  ) {
      return this.candidateService.updateWorkExperience(req.user.email, experienceId, updateWorkExperienceDto);
  }

  @Delete('work-experience/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteWorkExperience(
      @Request() req: AuthenticatedRequest,
      @Param('id', ParseIntPipe) experienceId: number,
  ) {
      return this.candidateService.deleteWorkExperience(req.user.email, experienceId);
  }


//   @Post('qualification')
//   addQualification(
//       @Request() req: AuthenticatedRequest,
//       @Body() createQualificationDto: CreateQualificationDto
//   ) {
//       return this.candidateService.addQualification(req.user.email, createQualificationDto);
//   }

//   @Patch('qualification/:id')
//   updateQualification(
//       @Request() req: AuthenticatedRequest,
//       @Param('id', ParseIntPipe) qualificationId: number,
//       @Body() updateQualificationDto: UpdateQualificationDto
//   ) {
//       return this.candidateService.updateQualification(req.user.email, qualificationId, updateQualificationDto);
//   }

//   @Delete('qualification/:id')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   deleteQualification(
//       @Request() req: AuthenticatedRequest,
//       @Param('id', ParseIntPipe) qualificationId: number,
//   ) {
//       return this.candidateService.deleteQualification(req.user.email, qualificationId);
//   }



  @Post('cv')
  addCV(
      @Request() req: AuthenticatedRequest,
      @Body() createCVDto: CreateCVDto
  ) {
      return this.candidateService.addCV(req.user.email, createCVDto);
  }

  @Patch('cv/:id')
  updateCV(
      @Request() req: AuthenticatedRequest,
      @Param('id', ParseIntPipe) cvId: number,
      @Body() updateCVDto: UpdateCVDto
  ) {
      return this.candidateService.updateCV(req.user.email, cvId, updateCVDto);
  }

  @Delete('cv/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCV( 
      @Request() req: AuthenticatedRequest,
      @Param('id', ParseIntPipe) cvId: number,
  ) {
      await this.candidateService.deleteCV(req.user.email, cvId); 
  }
}