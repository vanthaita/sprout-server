import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import {
  CreateInterviewDto,
  UpdateInterviewDto,
  InterviewResponseDto,
} from './dto/interview.dto';
import { AuthGuard as JWTAuthGuard } from '../../core/guard/authenticated.guard';
import { RolesGuard } from '../../core/guard/roles.guard';
import { Roles } from '../../core/decorator/roles.decorator';
import { AuthenticatedRequest } from '../../core/type/interface';
import { UserType } from 'generated/prisma';

@Controller('interviews')
@UseGuards(JWTAuthGuard, RolesGuard)
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  @Roles(UserType.EMPLOYER)
  async createInterview(
    @Request() req: AuthenticatedRequest,
    @Body() createInterviewDto: CreateInterviewDto,
  ): Promise<InterviewResponseDto> {
    try {
      if (req.user.id !== createInterviewDto.employerId) {
        throw new ForbiddenException('You can only create interviews for yourself');
      }
      return await this.interviewService.createInterview(createInterviewDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  @Roles(UserType.CANDIDATE, UserType.EMPLOYER, UserType.ADMIN)
  async getInterview(
    @Request() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InterviewResponseDto> {
    try {
      const interview = await this.interviewService.getInterviewById(id);
      
      if (
        req.user.user_type !== UserType.ADMIN &&
        interview.candidate.id !== req.user.id &&
        interview.employer.id !== req.user.id
      ) {
        throw new ForbiddenException('Not authorized to view this interview');
      }
      
      return interview;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  @Roles(UserType.CANDIDATE, UserType.EMPLOYER, UserType.ADMIN)
  async getInterviews(
    @Request() req: AuthenticatedRequest,
    @Query('candidateId') candidateId?: string,
    @Query('employerId') employerId?: string,
    @Query('jobId') jobId?: string,
    @Query('status') status?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<InterviewResponseDto[]> {
    if (req.user.user_type === UserType.CANDIDATE) {
      candidateId = req.user.id.toString();
    } else if (req.user.user_type === UserType.EMPLOYER) {
      employerId = req.user.id.toString();
    }

    const filter = {
      candidateId: candidateId ? parseInt(candidateId) : undefined,
      employerId: employerId ? parseInt(employerId) : undefined,
      jobId: jobId ? parseInt(jobId) : undefined,
      status,
      fromDate: fromDate ? new Date(fromDate) : undefined,
      toDate: toDate ? new Date(toDate) : undefined,
    };

    return this.interviewService.getInterviews(filter);
  }

  @Put(':id')
  @Roles(UserType.EMPLOYER, UserType.ADMIN)
  async updateInterview(
    @Request() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInterviewDto: UpdateInterviewDto,
  ): Promise<InterviewResponseDto> {
    try {
      if (req.user.user_type !== UserType.ADMIN) {
        const interview = await this.interviewService.getInterviewById(id);
        if (interview.employer.id !== req.user.id) {
          throw new ForbiddenException('You can only update your own interviews');
        }
      }

      return await this.interviewService.updateInterview(id, updateInterviewDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserType.EMPLOYER, UserType.ADMIN)
  async deleteInterview(
    @Request() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      if (req.user.user_type !== UserType.ADMIN) {
        const interview = await this.interviewService.getInterviewById(id);
        if (interview.employer.id !== req.user.id) {
          throw new ForbiddenException('You can only delete your own interviews');
        }
      }

      await this.interviewService.deleteInterview(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}