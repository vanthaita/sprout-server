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
  Put
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { CreateEmployerDto, UpdateEmployerDto, EmployerResponseDto } from './dto/employer.dto';
import { AuthGuard as JWTAuthGuard } from '../../core/guard/authenticated.guard'; 
import { AuthenticatedRequest } from '../../core/type/interface'; 
import { CreateJobDto, JobFilterDto, UpdateJobDto } from './dto/job.dto';
import { ApplicationFilterDto, UpdateApplicationStatusDto } from './dto/application.dto';
@Controller('employer')
@UseGuards(JWTAuthGuard)
// createJob()
// getEmployerJobs()
// getJobDetails()
// updateJob()
// deleteJob()
// getApplications()
// getApplicationDetails()
// updateApplicationStatus()
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEmployer(
    @Request() req: AuthenticatedRequest,
    @Body() createEmployerDto: CreateEmployerDto
  ){
    return this.employerService.createEmployer(createEmployerDto, req.user.email);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async updateEmployer(
    @Request() req: AuthenticatedRequest,
    @Body() updateEmployerDto: UpdateEmployerDto
  ) {
    return this.employerService.updateEmployer(updateEmployerDto, req.user.email);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(
    @Request() req: AuthenticatedRequest,
  ): Promise<EmployerResponseDto> {
    return this.employerService.getProfile(req.user.email);
  }

  @Post('jobs')
  async createJob(
    @Request() req: AuthenticatedRequest,
    @Body() createJobDto: CreateJobDto
  ) {
    return this.employerService.createJob(createJobDto, req.user.email);
  }
  
  @Get('jobs')
  async getJobs(
    @Request() req: AuthenticatedRequest,
    @Query() filter: JobFilterDto
  ) {
    return this.employerService.getEmployerJobs(filter, req.user.email);
  }

  @Get('jobs/:id')
  async getJobDetails(
    @Param('id', ParseIntPipe) jobId: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.employerService.getJobDetails(jobId,req.user.email);
  }

  @Patch('jobs/:id')
  async updateJob(
    @Param('id', ParseIntPipe) jobId: number,
    @Request() req: AuthenticatedRequest,
    @Body() updateJobDto: UpdateJobDto
  ) {
    return this.employerService.updateJob(jobId, updateJobDto, req.user.email);
  }

  @Delete('jobs/:id')
  async deleteJob(
    @Param('id', ParseIntPipe) jobId: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.employerService.deleteJob(jobId, req.user.email);
  }

  @Get('applications')
  async getApplications(
    @Query() filter: ApplicationFilterDto,
    @Request() req: AuthenticatedRequest
  ) {
    return this.employerService.getApplications(filter, req.user.email);
  }

  @Get('applications/:id')
  async getApplicationDetails(
    @Param('id', ParseIntPipe) applicationId: number,
    @Request() req: AuthenticatedRequest
  ) {
    return this.employerService.getApplicationDetails(applicationId, req.user.email);
  }

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