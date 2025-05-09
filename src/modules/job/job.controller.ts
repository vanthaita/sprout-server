import { Body, Controller, Get } from '@nestjs/common';
import { JobService } from './job.service';
import { JobFilterDto } from '../employer/dto/job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Get()
  async getAlljob(
    @Body() filter: JobFilterDto
  ) {
    return await this.jobService.getAllJob(filter);
  }
}
