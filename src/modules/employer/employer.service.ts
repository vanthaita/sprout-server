import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
            select: {
              id: true,
              userType: true,
              candidate: true,
              employer: true,
            }
        });
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
         if (existingUser.candidate) {
              throw new ConflictException('User already has a candidate profile');
          }
          
          if (existingUser.employer) {
              throw new ConflictException('User already has a employer profile');
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

    // Job methods
    async createJob(createJobDto: CreateJobDto, email: string) {
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
                    connect: { id: existingUser.employer.id }
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
              { description: { contains: filter.search, mode: 'insensitive' } }
            ];
        }
        if (filter.jobTypes && filter.jobTypes.length > 0) {
            whereConditions.jobType = { in: filter.jobTypes };
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

    async getJobDetails(jobId: number, email: string) {
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
                    fullName: true,
                    profilePhotoUrl: true
                  }
                },
                cv: {
                  select: {
                    fileUrl: true
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
                name: app.candidate.fullName || 'Unknown',
                photoUrl: app.candidate.profilePhotoUrl
              },
              cvUrl: app.cv.fileUrl
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

    // Application methods
    async getApplications(filter: ApplicationFilterDto, email: string) {
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
                  fullName: true,
                  profilePhotoUrl: true
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
          job: {
            id: app.job.id,
            title: app.job.title
          },
          candidate: {
            id: app.candidate.id,
            name: app.candidate.fullName || 'Unknown',
            photoUrl: app.candidate.profilePhotoUrl
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

    async getApplicationDetails(applicationId: number, email: string) {
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
                fullName: true,
                phoneNumber: true,
                profilePhotoUrl: true,
                user: {
                  select: {
                    email: true
                  }
                }
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
            job: {
                id: application.job.id,
                title: application.job.title,
                description: application.job.description
            },
            candidate: {
                id: application.candidate.id,
                name: application.candidate.fullName || 'Unknown',
                photoUrl: application.candidate.profilePhotoUrl,
                contact: {
                    email: application.candidate.user.email,
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

    async updateApplicationStatus(applicationId: number, status: ApplicationStatus, email: string) {
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
            candidate: { select: { id: true, fullName: true } }
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
            name: updated.candidate.fullName || 'Unknown'
          }
        };
    }
}