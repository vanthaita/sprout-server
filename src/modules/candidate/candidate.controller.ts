/* eslint-disable @typescript-eslint/no-unsafe-return */
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
  HttpStatus, 
  Query,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { AuthGuard as JWTAuthGuard } from '../../core/guard/authenticated.guard'; 
import { AuthenticatedRequest } from '../../core/type/interface'; 
import { CreateCandidateDto, UpdateCandidateDto } from './dto/candidate';
import { CreateEducationListDto, UpdateEducationDto } from './dto/education';
import { CreateWorkExperienceListDto, UpdateWorkExperienceDto } from './dto/work-experience';
import { CreateCVDto, UpdateCVDto } from './dto/cv';
import { RolesGuard } from '../../core/guard/roles.guard';
import { UserType } from 'generated/prisma';
import { Roles } from '../../core/decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('candidate')
@UseGuards(JWTAuthGuard, RolesGuard)
export class CandidateController {
    constructor(private readonly candidateService: CandidateService) {}

    @Roles(UserType.CANDIDATE, UserType.EMPLOYER, UserType.ADMIN)
    @Get('profile') 
    async getCandidateProfile(
        @Request() req: AuthenticatedRequest,
        @Query('email') email?: string
    ) {
    
        const targetEmail = email || req.user.email;
        return this.candidateService.getCandidateProfileDetails(
            targetEmail, 
            req.user.email  
        );
    }
    
    @Post('profile')
    @UseInterceptors(FileInterceptor('profilePhoto'))
    async createCandidateProfile(
        @Request() req: AuthenticatedRequest,
        @Body() createCandidateDto: CreateCandidateDto,
        @UploadedFile() candidateLogoFile?: Express.Multer.File
    ) {
        return this.candidateService.createCandidateProfile(
            req.user.email, 
            createCandidateDto,
            candidateLogoFile
        );
    }
    @Roles(UserType.CANDIDATE)
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
        @Body() createEducationDto: CreateEducationListDto
    ) {
        return this.candidateService.addEducations(req.user.email, createEducationDto.educations);
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
        @Body() createWorkExperienceDto: CreateWorkExperienceListDto
    ) {
        return this.candidateService.addWorkExperiences(req.user.email, createWorkExperienceDto.workExperiences);
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

    @Roles(UserType.CANDIDATE)
    @Post('cv')
    addCV(
        @Request() req: AuthenticatedRequest,
        @Body() createCVDto: CreateCVDto
    ) {
        return this.candidateService.addCV(req.user.email, createCVDto);
    }

    @Roles(UserType.CANDIDATE)
    @Patch('cv/:id')
    updateCV(
        @Request() req: AuthenticatedRequest,
        @Param('id', ParseIntPipe) cvId: number,
        @Body() updateCVDto: UpdateCVDto
    ) {
        return this.candidateService.updateCV(req.user.email, cvId, updateCVDto);
    }

    @Roles(UserType.CANDIDATE)
    @Delete('cv/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteCV(
        @Request() req: AuthenticatedRequest,
        @Param('id', ParseIntPipe) cvId: number,
    ) {
        await this.candidateService.deleteCV(req.user.email, cvId);
    }

    @Roles(UserType.CANDIDATE)
    @Post('application')
    async applicationJob(
        @Request() req: AuthenticatedRequest,
        @Body() body: {jobId: number}
    ) {
        const {jobId} = body;
        return this.candidateService.applyForJob(req.user.email, jobId);
    }

    @Roles(UserType.CANDIDATE)
    @Get('applications')
    async getApplicationForCandidate(
        @Request() req: AuthenticatedRequest,
    ) {
        return this.candidateService.getApplicationsForCandidate(req.user.email);
    }
}