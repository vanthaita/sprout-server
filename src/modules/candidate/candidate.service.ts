/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, UserType } from 'generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCandidateDto,
  UpdateCandidateDto,
} from './dto/candidate';
import {
  CreateEducationDto,
  UpdateEducationDto,
} from './dto/education';
import {
  CreateWorkExperienceDto,
  UpdateWorkExperienceDto,
} from './dto/work-experience';
import { CreateCVDto, UpdateCVDto } from './dto/cv';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { aiGenerateCvAiAnalitytic } from 'src/core/lib/gemini';

@Injectable()
export class CandidateService {
    constructor(
        private readonly prismaService: PrismaService, 
        private readonly cloudinaryService: CloudinaryService
    ) {}

    private async getCandidateIdByEmail(email: string): Promise<number> {
        const user = await this.prismaService.user.findUnique({
        where: { email },
        select: { id: true, candidate: { select: { id: true } } },
        });

        if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
        }
        if (!user.candidate) {
        throw new NotFoundException(
            `Candidate profile for user ${email} not found`,
        );
        }
        return user.candidate.id;
    }
    private async validateUserForCandidateProfile(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
            include: { candidate: true, employer: true },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.candidate) {
            throw new ConflictException('User already has a candidate profile');
        }

        if (user.employer) {
            throw new ConflictException('User already has an employer profile');
        }

        return user;
    }

    private async handleFileUpload(file: Express.Multer.File): Promise<string> {
        try {
            const uploadResult = await this.cloudinaryService.uploadFile(file);
            return uploadResult.url as string;
        } catch (error) {
            console.error('Error uploading file to Cloudinary:', error);
            throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
        }
    }

    private prepareCandidateData(
        createDto: CreateCandidateDto,
        profilePhotoUrl?: string
    ): CreateCandidateDto {
        return {
            ...createDto,
            profilePhotoUrl
        };
    }

    private createCandidateTransaction(userId: number, candidateData: CreateCandidateDto) {
        return this.prismaService.$transaction([
            this.prismaService.user.update({
                where: { id: userId },
                data: { isOnboarded: true, userType: 'CANDIDATE' },
            }),
            this.prismaService.candidate.create({
                data: {
                    ...candidateData,
                    user: { connect: { id: userId } },
                },
            }),
        ]);
    }
    async createCandidateProfile(
         email: string,
        candidateProfileCreateDto: CreateCandidateDto,
        candidateLogoFile?: Express.Multer.File
    ) {
        const user = await this.validateUserForCandidateProfile(email);
        const profilePhotoUrl = candidateLogoFile 
            ? await this.handleFileUpload(candidateLogoFile)
            : undefined;
        const candidateData = this.prepareCandidateData(candidateProfileCreateDto, profilePhotoUrl);
        return this.createCandidateTransaction(user.id, candidateData);
    }

    async updateCandidateProfile(
        email: string,
        candidateProfileUpdateDto: UpdateCandidateDto,
    ) {
        const existingUser = await this.prismaService.user.findUnique({
        where: { email },
        include: { candidate: true },
        });

        if (!existingUser) {
        throw new NotFoundException('User not found');
        }

        if (!existingUser.candidate) {
        throw new NotFoundException('Candidate profile not found');
        }

        return this.prismaService.candidate.update({
        where: { userId: existingUser.id },
        data: {
            ...candidateProfileUpdateDto,
            dateOfBirth: candidateProfileUpdateDto.dateOfBirth
            ? new Date(candidateProfileUpdateDto.dateOfBirth).toISOString()
            : undefined,
        },
        });
    }

    async getCandidateProfileDetails(email: string, requestingUserEmail?: string) {
        let requestingUser: any = null;
        if (requestingUserEmail) {
            requestingUser = await this.prismaService.user.findUnique({
                where: { email: requestingUserEmail },
                select: { 
                    email: true,
                    userType: true 
                }
            });
        }

        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            include: {
                candidate: {
                    include: {
                        workExperience: true,
                        education: true,
                        CV: true,
                        applications: {
                            include: {
                                job: {
                                    select: {
                                        id: true,
                                        title: true,
                                        status: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        if (!existingUser.candidate) {
            throw new NotFoundException('Candidate profile not found');
        }

        const response = {
            ...existingUser.candidate,
            user: {
                email: existingUser.email,
                fullName: existingUser.fullName,
            },
        };

        const isOwner = requestingUserEmail && requestingUserEmail === email;

        if (!isOwner && requestingUser) {
            if (requestingUser.userType !== UserType.ADMIN && 
                requestingUser.userType !== UserType.EMPLOYER) {
                throw new ForbiddenException('You do not have permission to view this profile');
            }
            return this.filterSensitiveInfo(response);
        }

        return response;
    }

    private filterSensitiveInfo(candidateData: any) {
        const filtered = JSON.parse(JSON.stringify(candidateData));
        
        delete filtered.phoneNumber;
        delete filtered.dateOfBirth;
        delete filtered.address;
        
        if (filtered.CV) {
            filtered.CV = filtered.CV.map(cv => ({
                id: cv.id,
                fileName: cv.fileName,
                fileType: cv.fileType,
                uploadedAt: cv.uploadedAt
            }));
        }
        
        if (filtered.applications) {
            filtered.applications = filtered.applications.map(app => ({
                id: app.id,
                applicationDate: app.applicationDate,
                status: app.status,
                job: app.job
            }));
        }
        
        return filtered;
    }

    async addEducations(email: string, dtos: CreateEducationDto[]) {
        if (!dtos?.length) {
        throw new Error('Educations data must be provided as a non-empty array');
        }

        const candidateId = await this.getCandidateIdByEmail(email);
        return this.prismaService.education.createMany({
        data: dtos.map((dto) => ({ ...dto, candidateId })),
        });
    }

    async updateEducation(
        email: string,
        educationId: number,
        dto: UpdateEducationDto,
    ) {
        const candidateId = await this.getCandidateIdByEmail(email);
        const education = await this.prismaService.education.findFirst({
        where: { id: educationId, candidateId },
        });

        if (!education) {
        throw new NotFoundException(
            `Education record with ID ${educationId} not found or does not belong to the user.`,
        );
        }

        return this.prismaService.education.update({
        where: { id: educationId },
        data: dto,
        });
    }

    async deleteEducation(email: string, educationId: number) {
        const candidateId = await this.getCandidateIdByEmail(email);
        const education = await this.prismaService.education.findFirst({
            where: { id: educationId, candidateId },
            select: { id: true },
        });

        if (!education) {
            throw new NotFoundException(
                `Education record with ID ${educationId} not found or does not belong to the user.`,
            );
        }

        return this.prismaService.education.delete({
        where: { id: educationId },
        });
    }

    async addWorkExperiences(
        email: string,
        dtos: CreateWorkExperienceDto[],
    ) {
        const candidateId = await this.getCandidateIdByEmail(email);
        return this.prismaService.workExperience.createMany({
            data: dtos.map((dto) => ({
                ...dto,
                startDate: new Date(dto.startDate),
                endDate: dto.endDate ? new Date(dto.endDate) : null,
                candidateId,
            })),
        });
    }

    async updateWorkExperience(
        email: string,
        experienceId: number,
        dto: UpdateWorkExperienceDto,
    ) {
        const candidateId = await this.getCandidateIdByEmail(email);
        const experience = await this.prismaService.workExperience.findFirst({
            where: { id: experienceId, candidateId },
        });

        if (!experience) {
        throw new NotFoundException(
            `Work Experience record with ID ${experienceId} not found or does not belong to the user.`,
        );
        }

        const dataToUpdate: Prisma.WorkExperienceUpdateInput = { ...dto };
        if (dto.startDate) dataToUpdate.startDate = new Date(dto.startDate);
        if (dto.endDate !== undefined) {
            dataToUpdate.endDate = dto.endDate ? new Date(dto.endDate) : null;
        }

        return this.prismaService.workExperience.update({
            where: { id: experienceId },
            data: dataToUpdate,
        });
    }

    async deleteWorkExperience(email: string, experienceId: number) {
        const candidateId = await this.getCandidateIdByEmail(email);
        const experience = await this.prismaService.workExperience.findFirst({
            where: { id: experienceId, candidateId },
            select: { id: true },
        });

        if (!experience) {
        throw new NotFoundException(
            `Work Experience record with ID ${experienceId} not found or does not belong to the user.`,
        );
        }

        return this.prismaService.workExperience.delete({
            where: { id: experienceId },
        });
    }

    async addCV(email: string, dto: CreateCVDto) {
        const candidateId = await this.getCandidateIdByEmail(email);

        if (dto.isPrimary) {
        await this.prismaService.cV.updateMany({
            where: {
                candidateId,
                isPrimary: true,
            },
            data: {
                isPrimary: false,
            },
        });
        }

        return this.prismaService.cV.create({
            data: {
                ...dto,
                candidate: { connect: { id: candidateId } },
            },
        });
    }

    async updateCV(email: string, cvId: number, dto: UpdateCVDto) {
        const candidateId = await this.getCandidateIdByEmail(email);
        const cv = await this.prismaService.cV.findFirst({
            where: { id: cvId, candidateId },
        });

        if (!cv) {
            throw new NotFoundException(
                `CV record with ID ${cvId} not found or does not belong to the user.`,
            );
        }

        if (dto.isPrimary) {
        await this.prismaService.cV.updateMany({
            where: {
                candidateId,
                isPrimary: true,
                NOT: { id: cvId },
            },
            data: {
                isPrimary: false,
            },
        });
        }

        return this.prismaService.cV.update({
            where: { id: cvId },
            data: dto,
        });
    }

    async deleteCV(email: string, cvId: number) {
        const candidateId = await this.getCandidateIdByEmail(email);
        const cv = await this.prismaService.cV.findFirst({
         where: { id: cvId, candidateId },
        });

        if (!cv) {
        throw new NotFoundException(
            `CV record with ID ${cvId} not found or does not belong to the user.`,
        );
        }

        try {
            return await this.prismaService.cV.delete({
                where: { id: cvId },
            });
        } catch (error) {
            console.error('Error deleting CV:', error);
            throw new InternalServerErrorException('Failed to delete CV.');
        }
    }

    async getPrimaryCV(email: string) {
        const candidateId = await this.getCandidateIdByEmail(email);
        return this.prismaService.cV.findFirst({
            where: {
                candidateId,
                isPrimary: true,
            },
        });
    }

    async applyForJob(email: string, jobId: number) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
            select: {
                id: true,
                candidate: true
            },
        });

        if (!user?.candidate) {
            throw new NotFoundException('Candidate profile not found');
        }

        const candidateId = user.candidate.id;

        const jobExists = await this.prismaService.job.findUnique({
            where: { id: jobId },
            include: {
                employer: true,
            }
        });

        if (!jobExists) {
            throw new NotFoundException('Job not found');
        }

        try {
            const candidateProfile = user.candidate;
            const jobInfo = jobExists;
            const aiResponse = await aiGenerateCvAiAnalitytic(candidateProfile, jobInfo);
        
            if (!aiResponse) {
                throw new Error("AI analysis failed or returned null.");
            }

            return await this.prismaService.application.create({
                data: {
                    jobId,
                    candidateId,
                    status: 'APPLICATION_SUBMITTED',
                    score: aiResponse.score,
                    AIanalysis: aiResponse.analytic
                },
                select: {
                    id: true,
                    applicationDate: true,
                    status: true,
                    job: {
                        select: {
                            id: true,
                            title: true,
                            employer: {
                                select: {
                                    companyName: true,
                                },
                            },
                        },
                    },
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                const existingApplication = await this.prismaService.application.findFirst({
                    where: {
                        candidateId,
                        jobId,
                    },
                    select: { id: true },
                });

                if (existingApplication) {
                    throw new ConflictException('You have already applied for this job');
                } else {
                    throw new InternalServerErrorException('Failed to process your application');
                }
            }
            throw error; 
        }
    }

    async getApplicationsForCandidate(email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            include: { candidate: true },
        });

        if (!existingUser) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        if (!existingUser.candidate) {
            throw new NotFoundException(
                `User with email ${email} is not a candidate`,
            );
        }

        return this.prismaService.application.findMany({
            where: {
                candidateId: existingUser.candidate.id,
            },
            include: {
                job: true,
            },
        });
    }
}