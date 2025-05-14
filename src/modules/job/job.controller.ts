import { Body, Controller, Get, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { JobFilterDto } from '../employer/dto/job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  
  @Get()
  async getAlljob(
    @Query() filter: JobFilterDto
  ) {
    return await this.jobService.getAllJob(filter);
  }
}