import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployerDto, EmployerResponseDto, UpdateEmployerDto } from './dto/employer.dto';
import { CreateJobDto, JobFilterDto, JobResponseDto, UpdateJobDto } from './dto/job.dto';
import { ApplicationFilterDto } from './dto/application.dto';
import { ApplicationStatus } from 'generated/prisma';

@Injectable()
export class EmployerService {
    constructor(private prismaService: PrismaService) {}

    async createEmployer(createEmployerDto: CreateEmployerDto, email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        return await this.prismaService.employer.create({
            data: {
                ...createEmployerDto,
                user: {
                    connect: {
                        id: existingUser.id
                    }
                },
            },
        });
    }

    async updateEmployer(updateEmployerDto: UpdateEmployerDto, email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            include: {
                employer: true
            }
        });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        if (!existingUser.employer) {
            throw new NotFoundException('Employer profile not found');
        }
        return await this.prismaService.employer.update({
            where: {
                userId: existingUser.id
            },
            data: {
                ...updateEmployerDto,
            },
        });
    }

    async getProfile(email: string): Promise<EmployerResponseDto> {
        const user = await this.prismaService.user.findUnique({
          where: { email },
          include: {
            employer: true,
          },
        });
    
        if (!user || !user.employer) {
          throw new NotFoundException('Employer profile not found');
        }
    
        return new EmployerResponseDto({
            ...user.employer,
        })
    }


    // job
    async createjob(createJobDto: CreateJobDto, email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            include: {
                employer: true
            }
        });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        if (!existingUser.employer) {
            throw new NotFoundException('Employer profile not found');
        }

        return await this.prismaService.job.create({
            data: {
                ...createJobDto,
                employer: {
                    connect: existingUser.employer
                }
            }
        })
    }
    async getEmployerJobs(filter: JobFilterDto, email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            include: {
                employer: true
            }
        });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        if (!existingUser.employer) {
            throw new NotFoundException('Employer profile not found');
        }
        const whereConditions: any = {
            employerId: existingUser.employer.id
        };

        if (filter.search) {
            whereConditions.OR = [
              { title: { contains: filter.search, mode: 'insensitive' } },
              { titleJp: { contains: filter.search, mode: 'insensitive' } },
              { description: { contains: filter.search, mode: 'insensitive' } }
            ];
        }
        if (filter.jobTypes && filter.jobTypes.length > 0) {
            whereConditions.jobType = { in: filter.jobTypes };
        }
        if (filter.japaneseLevel) {
            whereConditions.requiredJapaneseLevel = filter.japaneseLevel;
        }
        if (filter.status) {
            whereConditions.status = filter.status;
        }

        const page = filter.page || 1;
        const limit = filter.limit || 10;
        const skip = (page - 1) * limit;

        const [jobs, totalCount] = await Promise.all([
            this.prismaService.job.findMany({
              where: whereConditions,
              skip,
              take: limit,
              orderBy: { postedDate: 'desc' }
            }),
            this.prismaService.job.count({ where: whereConditions })
        ]);

        const jobDtos = jobs.map(job => new JobResponseDto(job));
        return {
            data: jobDtos,
            total: totalCount,
            page,
            limit,
            totalPages: Math.ceil(totalCount / limit)
        };
    }

    async getJobDetails(
        jobId: number,
        email: string
      ) {
        const existingUser = await this.prismaService.user.findUnique({
          where: { email },
          include: { employer: true }
        });
      
        if (!existingUser) {
          throw new NotFoundException('User not found');
        }
        if (!existingUser.employer) {
          throw new NotFoundException('Employer profile not found');
        }
        const job = await this.prismaService.job.findUnique({
          where: { 
            id: jobId,
            employerId: existingUser.employer.id 
          },
          include: {
            applications: {
              select: {
                id: true,
                status: true,
                applicationDate: true,
                candidate: {
                  select: {
                    id: true,
                    fullNameKanji: true,
                    fullNameKana: true,
                    japaneseProficiency: true
                  }
                }
              },
              orderBy: {
                applicationDate: 'desc'
              }
            }
          }
        });
      
        if (!job) {
          throw new NotFoundException('Job not found or not owned by this employer');
        }
        return new JobResponseDto({
            ...job,
            applications: job.applications.map(app => ({
              id: app.id,
              status: app.status,
              applicationDate: app.applicationDate,
              candidate: {
                id: app.candidate.id,
                name: app.candidate.fullNameKana || app.candidate.fullNameKanji || 'Unknown', 
                japaneseLevel: app.candidate.japaneseProficiency
              }
            }))
        });
    }


    async updateJob(jobId: number, updateJob: UpdateJobDto, email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            include: {
                employer: true
            }
        });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        if (!existingUser.employer) {
            throw new NotFoundException('Employer profile not found');
        }

        const existingJob = await this.prismaService.job.findFirst({
            where: {
              id: jobId,
              employerId: existingUser.employer.id
            }
          });
        
        if (!existingJob) {
            throw new NotFoundException('Job not found or not owned by this employer');
        }
        const updatedJob  =  await this.prismaService.job.update({
            where: {
                id: jobId
            },
            data: {
                ...updateJob,
            },
        });

        return new JobResponseDto(updatedJob);
    }

    async deleteJob(jobId: number, email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            include: {
                employer: true
            }
        });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        if (!existingUser.employer) {
            throw new NotFoundException('Employer profile not found');
        }

        const existingJob = await this.prismaService.job.findFirst({
            where: {
              id: jobId,
              employerId: existingUser.employer.id
            }
          });
        
        if (!existingJob) {
            throw new NotFoundException('Job not found or not owned by this employer');
        }
        const updatedJob  =  await this.prismaService.job.delete({
            where: {
                id: jobId
            },
        });

        return new JobResponseDto(updatedJob);
    }

    // Applicantion
    async getApplications(
        filter: ApplicationFilterDto,
        email: string
      ) {
        const existingUser = await this.prismaService.user.findUnique({
          where: { email },
          include: { employer: true }
        });
      
        if (!existingUser) throw new NotFoundException('User not found');
        if (!existingUser.employer) throw new NotFoundException('Employer profile not found');
      
        const where: any = {
          job: {
            employerId: existingUser.employer.id
          }
        };
      
        if (filter.jobId) where.jobId = filter.jobId;
        if (filter.status) where.status = filter.status;
      
        const page = filter.page || 1;
        const limit = filter.limit || 10;
        const skip = (page - 1) * limit;
      
        const [applications, total] = await Promise.all([
          this.prismaService.application.findMany({
            where,
            skip,
            take: limit,
            include: {
              job: {
                select: {
                  id: true,
                  title: true
                }
              },
              candidate: {
                select: {
                  id: true,
                  fullNameKanji: true,
                  fullNameKana: true,
                  japaneseProficiency: true
                }
              },
              cv: {
                select: {
                  id: true,
                  fileUrl: true
                }
              }
            },
            orderBy: { applicationDate: 'desc' }
          }),
          this.prismaService.application.count({ where })
        ]);
        const data = applications.map(app => ({
          id: app.id,
          status: app.status,
          applicationDate: app.applicationDate,
          coverLetter: app.coverLetter,
          job: {
            id: app.job.id,
            title: app.job.title
          },
          candidate: {
            id: app.candidate.id,
            name: app.candidate.fullNameKanji || app.candidate.fullNameKana || 'Unknown',
            japaneseLevel: app.candidate.japaneseProficiency
          },
          cvUrl: app.cv.fileUrl
        }));
      
        return {
          data,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        };
      }

      async getApplicationDetails(
        applicationId: number,
        email: string
      ) {
        const existingUser = await this.prismaService.user.findUnique({
          where: { email },
          include: { employer: true }
        });
      
        if (!existingUser) throw new NotFoundException('User not found');
        if (!existingUser.employer) throw new NotFoundException('Employer profile not found');
      
        const application = await this.prismaService.application.findFirst({
          where: {
            id: applicationId,
            job: {
              employerId: existingUser.employer.id
            }
          },
          include: {
            job: {
              select: {
                id: true,
                title: true,
                description: true
              }
            },
            candidate: {
              select: {
                id: true,
                fullNameKanji: true,
                fullNameKana: true,
                japaneseProficiency: true,
                phoneNumber: true,
                email: true
              }
            },
            cv: {
              select: {
                id: true,
                fileUrl: true,
                fileName: true
              }
            }
          }
        });
      
        if (!application) {
          throw new NotFoundException('Application not found or not authorized');
        }
      
        return {
            id: application.id,
            status: application.status,
            applicationDate: application.applicationDate,
            coverLetter: application.coverLetter,
            job: {
                id: application.job.id,
                title: application.job.title,
                description: application.job.description
            },
            candidate: {
                id: application.candidate.id,
                name: application.candidate.fullNameKanji || application.candidate.fullNameKana || 'Unknown',
                japaneseLevel: application.candidate.japaneseProficiency,
                contact: {
                email: application.candidate.email,
                phone: application.candidate.phoneNumber
                }
            },
            cv: {
                id: application.cv.id,
                url: application.cv.fileUrl,
                name: application.cv.fileName
            }
        };
    }

    async updateApplicationStatus(
        applicationId: number,
        status: ApplicationStatus,
        email: string
      ) {
        const existingUser = await this.prismaService.user.findUnique({
          where: { email },
          include: { employer: true }
        });
      
        if (!existingUser) throw new NotFoundException('User not found');
        if (!existingUser.employer) throw new NotFoundException('Employer profile not found');
      
        const existingApp = await this.prismaService.application.findFirst({
          where: {
            id: applicationId,
            job: {
              employerId: existingUser.employer.id
            }
          }
        });
      
        if (!existingApp) {
          throw new NotFoundException('Application not found or not authorized');
        }
      
        const updated = await this.prismaService.application.update({
          where: { id: applicationId },
          data: { status },
          include: {
            job: { select: { id: true, title: true } },
            candidate: { select: { id: true, fullNameKanji: true, fullNameKana: true } }
          }
        });
      
        return {
          id: updated.id,
          status: updated.status,
          job: {
            id: updated.job.id,
            title: updated.job.title
          },
          candidate: {
            id: updated.candidate.id,
            name: updated.candidate.fullNameKanji || updated.candidate.fullNameKana || 'Unknown'
          }
        };
      }
}
