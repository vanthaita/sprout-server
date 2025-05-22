/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployerDto, EmployerResponseDto, UpdateEmployerDto } from './dto/employer.dto';
import { CreateJobDto, JobFilterDto, JobResponseDto, UpdateJobDto } from './dto/job.dto';
import { ApplicationFilterDto } from './dto/application.dto';
import { ApplicationStatus } from 'generated/prisma';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class EmployerService {
    constructor(private prismaService: PrismaService,
        private readonly cloudinaryService: CloudinaryService
    ) {}
     private async handleFileUpload(file: Express.Multer.File): Promise<string> {
        try {
            const uploadResult = await this.cloudinaryService.uploadFile(file);
            return uploadResult.url as string;
        } catch (error) {
            console.error('Error uploading file to Cloudinary:', error);
            throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
        }
    }

    private prepareEmployerData(
        createDto: CreateEmployerDto,
        companyLogoUrl?: string
    ): CreateEmployerDto {
        return {
            ...createDto,
            companyLogoUrl
        };
    }

    private async createEmployerTransaction(userId: number, employerData: CreateEmployerDto) {
        return this.prismaService.$transaction([
            this.prismaService.user.update({
                where: { id: userId },
                data: { isOnboarded: true },
            }),
            this.prismaService.employer.create({
                data: {
                    ...employerData,
                    user: { connect: { id: userId } },
                },
            }),
        ]);
    }

    async createEmployer(
        createEmployerDto: CreateEmployerDto, 
        email: string,
        companyLogoFile?: Express.Multer.File
    ) {
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
            throw new ConflictException('User already has an employer profile');
        }

        let companyLogoUrl;
        if (companyLogoFile) {
            companyLogoUrl = await this.handleFileUpload(companyLogoFile);
        }

        const employerData = this.prepareEmployerData(createEmployerDto, companyLogoUrl);
        return this.createEmployerTransaction(existingUser.id, employerData);
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
    
        const baseWhere = {
            job: {
                employerId: existingUser.employer.id
            }
        };
    
        const where: any = { ...baseWhere };
        
        if (filter.jobId) where.jobId = filter.jobId;
        if (filter.status) where.status = filter.status;
        // if (filter.search) {
        //     where.OR = [
        //         {
        //             candidate: {
        //                 fullName: {
        //                     contains: filter.search,
        //                     mode: 'insensitive'
        //                 }
        //             }
        //         },
        //         {
        //             job: {
        //                 title: {
        //                     contains: filter.search,
        //                     mode: 'insensitive'
        //                 }
        //             }
        //         }
        //     ];
        // }
    
        const page = filter.page || 1;
        const limit = filter.limit || 10;
        const skip = (page - 1) * limit;
    
        const [statusCounts, uniqueCandidateCount, totalApplications] = await Promise.all([
            this.prismaService.application.groupBy({
                by: ['status'],
                where: baseWhere,
                _count: {
                    status: true
                }
            }),
            this.prismaService.application.findMany({
                where: baseWhere,
                select: {
                    candidateId: true
                },
                distinct: ['candidateId']
            }).then(results => results.length),
            this.prismaService.application.count({ where })
        ]);
    
        const statusCountMap = statusCounts.reduce((acc, item) => {
            acc[item.status] = item._count.status;
            return acc;
        }, {} as Record<ApplicationStatus, number>);
    
        const [applications] = await Promise.all([
            this.prismaService.application.findMany({
                where,
                skip,
                take: limit,
                include: {
                    job: {
                        select: {
                            id: true,
                            title: true,
                            location: true,
                            jobType: true
                        }
                    },
                    candidate: {
                        select: {
                            id: true,
                            fullName: true,
                            profilePhotoUrl: true,
                            phoneNumber: true,
                            address: true,
                            skills: true,
                            user: {
                                select: {
                                    email: true
                                }
                            },
                            education: {
                                select: {
                                    degree: true,
                                    fieldOfStudy: true,
                                    schoolName: true
                                },
                                orderBy: {
                                    endDate: 'desc'
                                },
                                take: 1
                            },
                            workExperience: {
                                select: {
                                    companyName: true,
                                    jobTitle: true,
                                    position: true
                                },
                                orderBy: {
                                    endDate: 'desc'
                                },
                                take: 1
                            },
                            CV: {
                                where: {
                                    isPrimary: true
                                },
                                select: {
                                    fileUrl: true
                                }
                            }
                        }
                    }
                },
                orderBy: { applicationDate: 'desc' }
            })
        ]);
    
        const data = applications.map(app => ({
            id: app.id,
            status: app.status,
            applicationDate: app.applicationDate,
            job: {
                id: app.job.id,
                title: app.job.title,
                location: app.job.location,
                type: app.job.jobType
            },
            candidate: {
                id: app.candidate.id,
                name: app.candidate.fullName || 'Unknown',
                email: app.candidate.user.email,
                phone: app.candidate.phoneNumber,
                location: app.candidate.address,
                skills: app.candidate.skills ? app.candidate.skills.split(',') : [],
                photoUrl: app.candidate.profilePhotoUrl,
                education: app.candidate.education[0] || null,
                experience: app.candidate.workExperience[0] || null,
                cvUrl: app.candidate.CV[0]?.fileUrl || null
            }
        }));
    
        return {
            data,
            total: totalApplications,
            page,
            limit,
            totalPages: Math.ceil(totalApplications / limit),
            counts: {
                totalApplications: totalApplications,
                totalCandidates: uniqueCandidateCount,
                byStatus: {
                    submitted: statusCountMap.APPLICATION_SUBMITTED || 0,
                    document_screening: statusCountMap.DOCUMENT_SCREENING || 0,
                    firstInterview: statusCountMap.FIRST_INTERVIEW || 0,
                    secondInterview: statusCountMap.SECOND_INTERVIEW || 0,
                    offerMade: statusCountMap.OFFER_STAGE || 0,
                    rejected: statusCountMap.REJECTED || 0,
                }
            }
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
                      description: true,
                      _count: {
                          select: {
                              applications: true
                          }
                      }
                  }
              },
              candidate: true
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
              description: application.job.description,
              totalApplications: application.job._count.applications
          },
          candidate: application.candidate
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