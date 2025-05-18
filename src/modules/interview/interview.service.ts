/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInterviewDto, UpdateInterviewDto, InterviewResponseDto } from './dto/interview.dto';

@Injectable()
export class InterviewService {
    constructor(private prismaService: PrismaService) {}

    async createInterview(createInterviewDto: CreateInterviewDto) {
        const candidate = await this.prismaService.candidate.findUnique({
            where: { id: createInterviewDto.candidateId },
            include: { user: true }
        });
        if (!candidate) {
            throw new NotFoundException('Candidate not found');
        }

        const employer = await this.prismaService.employer.findUnique({
            where: { id: createInterviewDto.employerId },
            include: { user: true }
        });
        if (!employer) {
            throw new NotFoundException('Employer not found');
        }

        const job = await this.prismaService.job.findFirst({
            where: {
                id: createInterviewDto.jobId,
                employerId: createInterviewDto.employerId
            }
        });
        if (!job) {
            throw new NotFoundException('Job not found or does not belong to this employer');
        }

        const interview = await this.prismaService.interviews.create({
            data: {
                candidateId: createInterviewDto.candidateId,
                jobId: createInterviewDto.jobId,
                employerId: createInterviewDto.employerId,
                scheduledDate: new Date(createInterviewDto.scheduledAt),
                duration: createInterviewDto.durationMinutes,
                meetingLink: createInterviewDto.meetingLink,
                notes: createInterviewDto.notes,
                status: 'SCHEDULED'
            },
            include: {
                candidate: {
                    include: { user: true }
                },
                employer: {
                    include: { user: true }
                },
                job: true
            }
        });

        return this.mapToInterviewResponseDto(interview);
    }

    async getInterviewById(id: number): Promise<InterviewResponseDto> {
        const interview = await this.prismaService.interviews.findUnique({
            where: { id },
            include: {
                candidate: {
                    include: { user: true }
                },
                employer: {
                    include: { user: true }
                },
                job: true
            }
        });

        if (!interview) {
            throw new NotFoundException('Interview not found');
        }

        return this.mapToInterviewResponseDto(interview);
    }

    async getInterviews(filter: {
        candidateId?: number;
        employerId?: number;
        jobId?: number;
        status?: string;
        fromDate?: Date;
        toDate?: Date;
    }): Promise<InterviewResponseDto[]> {
        const interviews = await this.prismaService.interviews.findMany({
            where: {
                candidateId: filter.candidateId,
                employerId: filter.employerId,
                jobId: filter.jobId,
                status: filter.status,
                scheduledDate: {
                    gte: filter.fromDate,
                    lte: filter.toDate
                }
            },
            include: {
                candidate: {
                    include: { user: true }
                },
                employer: {
                    include: { user: true }
                },
                job: true
            },
            orderBy: {
                scheduledDate: 'asc'
            }
        });

        return interviews.map(interview => this.mapToInterviewResponseDto(interview));
    }

    async updateInterview(id: number, updateInterviewDto: UpdateInterviewDto): Promise<InterviewResponseDto> {
        const existingInterview = await this.prismaService.interviews.findUnique({
            where: { id }
        });

        if (!existingInterview) {
            throw new NotFoundException('Interview not found');
        }

        const updatedInterview = await this.prismaService.interviews.update({
            where: { id },
            data: {
                scheduledDate: updateInterviewDto.scheduledAt ? new Date(updateInterviewDto.scheduledAt) : undefined,
                duration: updateInterviewDto.durationMinutes,
                meetingLink: updateInterviewDto.meetingLink,
                status: updateInterviewDto.status,
                feedback: updateInterviewDto.feedback
            },
            include: {
                candidate: {
                    include: { user: true }
                },
                employer: {
                    include: { user: true }
                },
                job: true
            }
        });

        return this.mapToInterviewResponseDto(updatedInterview);
    }

    private mapToInterviewResponseDto(interview: any): InterviewResponseDto {
        return {
            id: interview.id,
            job: {
                id: interview.job.id,
                title: interview.job.title
            },
            candidate: {
                id: interview.candidate.id,
                name: interview.candidate.user.fullName,
                profilePhoto: interview.candidate.profilePhotoUrl
            },
            employer: {
                id: interview.employer.id,
                companyName: interview.employer.companyName,
                logo: interview.employer.companyLogoUrl
            },
            title: interview.job.title + ' Interview', 
            scheduledAt: interview.scheduledDate.toISOString(),
            durationMinutes: interview.duration,
            status: interview.status as 'SCHEDULED' | 'COMPLETED' | 'CANCELLED',
            meetingLink: interview.meetingLink,
            createdAt: interview.createdAt.toISOString(),
            updatedAt: interview.updatedAt.toISOString()
        };
    }

    async deleteInterview(id: number) {
        return await this.prismaService.interviews.delete({
            where: {
                id
            }
        })
    }
}