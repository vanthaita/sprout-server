import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
  ParseIntPipe,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { CreateEmployerDto, UpdateEmployerDto, EmployerResponseDto } from './dto/employer.dto';
import { AuthGuard as JWTAuthGuard } from '../../core/guard/authenticated.guard'; 
import { AuthenticatedRequest } from '../../core/type/interface'; 
import { CreateJobDto, JobFilterDto, UpdateJobDto } from './dto/job.dto';
import { ApplicationFilterDto, UpdateApplicationStatusDto } from './dto/application.dto';
import { UserType } from 'generated/prisma';
import { Roles } from '../../core/decorator/roles.decorator';
import { RolesGuard } from '../../core/guard/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('employer')
@UseGuards(JWTAuthGuard, RolesGuard)
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('companyLogo'))
  async createEmployer(
      @Request() req: AuthenticatedRequest,
      @Body() createEmployerDto: CreateEmployerDto,
      @UploadedFile() companyLogoFile?: Express.Multer.File
  ) {
      return this.employerService.createEmployer(
          createEmployerDto,
          req.user.email,
          companyLogoFile
      );
  }

  @Roles(UserType.EMPLOYER)
  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateEmployer(
    @Request() req: AuthenticatedRequest,
    @Body() updateEmployerDto: UpdateEmployerDto
  ) {
    return this.employerService.updateEmployer(updateEmployerDto, req.user.email);
  }

  @Roles(UserType.EMPLOYER, UserType.ADMIN)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(
    @Request() req: AuthenticatedRequest,
  ): Promise<EmployerResponseDto> {
    return this.employerService.getProfile(req.user.email);
  }

  @Roles(UserType.EMPLOYER)
  @Post('jobs')
  async createJob(
    @Request() req: AuthenticatedRequest,
    @Body() createJobDto: CreateJobDto
  ) {
    return this.employerService.createJob(createJobDto, req.user.email);
  }
  
  @Roles(UserType.EMPLOYER, UserType.ADMIN)
  @Get('jobs')
  async getJobs(
    @Request() req: AuthenticatedRequest,
    @Query() filter: JobFilterDto
  ) {
    return this.employerService.getEmployerJobs(filter, req.user.email);
  }

  @Roles(UserType.EMPLOYER, UserType.ADMIN)
  @Get('jobs/:id')
  async getJobDetails(
    @Param('id', ParseIntPipe) jobId: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.employerService.getJobDetails(jobId, req.user.email);
  }

  @Roles(UserType.EMPLOYER)
  @Patch('jobs/:id')
  async updateJob(
    @Param('id', ParseIntPipe) jobId: number,
    @Request() req: AuthenticatedRequest,
    @Body() updateJobDto: UpdateJobDto
  ) {
    return this.employerService.updateJob(jobId, updateJobDto, req.user.email);
  }

  @Roles(UserType.EMPLOYER)
  @Delete('jobs/:id')
  async deleteJob(
    @Param('id', ParseIntPipe) jobId: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.employerService.deleteJob(jobId, req.user.email);
  }

  @Roles(UserType.EMPLOYER, UserType.ADMIN)
  @Get('applications')
  async getApplications(
    @Query() filter: ApplicationFilterDto,
    @Request() req: AuthenticatedRequest
  ) {
    return this.employerService.getApplications(filter, req.user.email);
  }

  @Roles(UserType.EMPLOYER, UserType.ADMIN)
  @Get('applications/:id')
  async getApplicationDetails(
    @Param('id', ParseIntPipe) applicationId: number,
    @Request() req: AuthenticatedRequest
  ) {
    return this.employerService.getApplicationDetails(applicationId, req.user.email);
  }

  @Roles(UserType.EMPLOYER)
  @Put('applications/:id/status')
  async updateApplicationStatus(
    @Param('id', ParseIntPipe) applicationId: number,
    @Request() req: AuthenticatedRequest,
    @Body() statusDto: UpdateApplicationStatusDto
  ) {
    return this.employerService.updateApplicationStatus(
      applicationId,
      statusDto.status,
      req.user.email
    );
  }
}