import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto, UpdateCandidateDto } from './dto/candidate';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEducationDto, UpdateEducationDto } from './dto/education';
import { Prisma } from 'generated/prisma';
import { CreateWorkExperienceDto, UpdateWorkExperienceDto } from './dto/work-experience';
import { CreateQualificationDto, UpdateQualificationDto } from './dto/qualification';
import { CreateCVDto, UpdateCVDto } from './dto/cv';

@Injectable()
export class CandidateService {
    constructor(private prismaService: PrismaService) {}

    private async findCandidateByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
            select: { id: true, candidate: { select: { id: true } } }, 
        });

        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        if (!user.candidate) {
            throw new NotFoundException(`Candidate profile for user ${email} not found`);
        }
        return user.candidate.id;
    }
    async createCandidateProfile(email: string, candidateProfileCreateDto: CreateCandidateDto) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        
        const { otherLanguages, ...rest } = candidateProfileCreateDto;
    
        return await this.prismaService.candidate.create({
            data: {
                ...rest,
                user: {
                    connect: {
                        id: existingUser.id
                    }
                },
                otherLanguages: otherLanguages
                    ? JSON.parse(JSON.stringify(otherLanguages))
                    : undefined
            }
        });
    }
    async updateCandidateProfile(email: string, candidateProfileUpdateDto: UpdateCandidateDto) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            include: { candidate: true } 
        });
        
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        
        if (!existingUser.candidate) {
            throw new NotFoundException('Candidate profile not found');
        }

        const { otherLanguages, ...rest } = candidateProfileUpdateDto;
        
        const updateData: any = { ...rest };
        
        if (otherLanguages !== undefined) {
            updateData.otherLanguages = otherLanguages
                ? JSON.parse(JSON.stringify(otherLanguages))
                : null;
        }
        const processedData = {
            ...rest,
            dateOfBirth: rest.dateOfBirth ? new Date(rest.dateOfBirth).toISOString() : null,
            otherLanguages: otherLanguages ? JSON.parse(JSON.stringify(otherLanguages)) : null,
            userId: existingUser.id
        };
        return await this.prismaService.candidate.update({
            where: { userId: existingUser.id },
            data: processedData
        });
    }
    
    async candidateProfileDetails(email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            include: { 
                candidate: true, 
             } 
        });
                
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        
        if (!existingUser.candidate) {
            throw new NotFoundException('Candidate profile not found');
        }

        const candidateData = await this.prismaService.candidate.findUnique({
            where: {
                userId: existingUser.id
            },
            include: {
                workExperience: true,
                education: true,
                qualifications: true,
                cvs           : true,
                applications  : true
            }
        })

        return {
            ...candidateData
        }
    }


    async addEducation(email: string, dto: CreateEducationDto) {
        const candidateId = await this.findCandidateByEmail(email);
        return this.prismaService.education.create({
            data: {
                ...dto,
                startDate: new Date(dto.startDate),
                endDate: dto.endDate ? new Date(dto.endDate) : null,
                candidate: { connect: { id: candidateId } },
            },
        });
    }


    async updateEducation(email: string, educationId: number, dto: UpdateEducationDto) {
        const candidateId = await this.findCandidateByEmail(email);
        const education = await this.prismaService.education.findFirst({
            where: { id: educationId, candidateId: candidateId },
        });
        if (!education) {
            throw new NotFoundException(`Education record with ID ${educationId} not found or does not belong to the user.`);
        }

        const dataToUpdate: Prisma.EducationUpdateInput = { ...dto };
        if (dto.startDate) dataToUpdate.startDate = new Date(dto.startDate);
        if (dto.endDate !== undefined) dataToUpdate.endDate = dto.endDate ? new Date(dto.endDate) : null;


        return this.prismaService.education.update({
            where: { id: educationId },
            data: dataToUpdate,
        });
    }

    async deleteEducation(email: string, educationId: number) {
        const candidateId = await this.findCandidateByEmail(email);
        const education = await this.prismaService.education.findFirst({
            where: { id: educationId, candidateId: candidateId },
             select: { id: true }
        });
        if (!education) {
            throw new NotFoundException(`Education record with ID ${educationId} not found or does not belong to the user.`);
        }

        return this.prismaService.education.delete({
            where: { id: educationId },
        });
    }

    async addWorkExperience(email: string, dto: CreateWorkExperienceDto) {
        const candidateId = await this.findCandidateByEmail(email);
        return this.prismaService.workExperience.create({
            data: {
                ...dto,
                startDate: new Date(dto.startDate),
                endDate: dto.endDate ? new Date(dto.endDate) : null,
                candidate: { connect: { id: candidateId } },
            },
        });
    }

    async updateWorkExperience(email: string, experienceId: number, dto: UpdateWorkExperienceDto) {
        const candidateId = await this.findCandidateByEmail(email);
        const experience = await this.prismaService.workExperience.findFirst({
            where: { id: experienceId, candidateId: candidateId },
        });
        if (!experience) {
            throw new NotFoundException(`Work Experience record with ID ${experienceId} not found or does not belong to the user.`);
        }

        const dataToUpdate: Prisma.WorkExperienceUpdateInput = { ...dto };
        if (dto.startDate) dataToUpdate.startDate = new Date(dto.startDate);
        if (dto.endDate !== undefined) dataToUpdate.endDate = dto.endDate ? new Date(dto.endDate) : null;


        return this.prismaService.workExperience.update({
            where: { id: experienceId },
            data: dataToUpdate,
        });
    }

    async deleteWorkExperience(email: string, experienceId: number) {
        const candidateId = await this.findCandidateByEmail(email);
        const experience = await this.prismaService.workExperience.findFirst({
            where: { id: experienceId, candidateId: candidateId },
             select: { id: true }
        });
        if (!experience) {
            throw new NotFoundException(`Work Experience record with ID ${experienceId} not found or does not belong to the user.`);
        }
        return this.prismaService.workExperience.delete({
            where: { id: experienceId },
        });
    }

    async addQualification(email: string, dto: CreateQualificationDto) {
        const candidateId = await this.findCandidateByEmail(email);
        return this.prismaService.qualification.create({
            data: {
                ...dto,
                issueDate: new Date(dto.issueDate),
                candidate: { connect: { id: candidateId } },
            },
        });
    }

    async updateQualification(email: string, qualificationId: number, dto: UpdateQualificationDto) {
        const candidateId = await this.findCandidateByEmail(email);
        const qualification = await this.prismaService.qualification.findFirst({
            where: { id: qualificationId, candidateId: candidateId },
        });
        if (!qualification) {
            throw new NotFoundException(`Qualification record with ID ${qualificationId} not found or does not belong to the user.`);
        }

         const dataToUpdate: Prisma.QualificationUpdateInput = { ...dto };
         if (dto.issueDate) dataToUpdate.issueDate = new Date(dto.issueDate);

        return this.prismaService.qualification.update({
            where: { id: qualificationId },
            data: dataToUpdate,
        });
    }

    async deleteQualification(email: string, qualificationId: number) {
        const candidateId = await this.findCandidateByEmail(email);
        const qualification = await this.prismaService.qualification.findFirst({
            where: { id: qualificationId, candidateId: candidateId },
             select: { id: true }
        });
        if (!qualification) {
            throw new NotFoundException(`Qualification record with ID ${qualificationId} not found or does not belong to the user.`);
        }
        return this.prismaService.qualification.delete({
            where: { id: qualificationId },
        });
    }


    async addCV(email: string, dto: CreateCVDto) {
        const candidateId = await this.findCandidateByEmail(email);
        return this.prismaService.cV.create({
            data: {
                ...dto,
                candidate: { connect: { id: candidateId } },
            },
        });
    }

    async updateCV(email: string, cvId: number, dto: UpdateCVDto) {
        const candidateId = await this.findCandidateByEmail(email);
        const cv = await this.prismaService.cV.findFirst({
            where: { id: cvId, candidateId: candidateId },
        });
        if (!cv) {
            throw new NotFoundException(`CV record with ID ${cvId} not found or does not belong to the user.`);
        }

        return this.prismaService.cV.update({
            where: { id: cvId },
            data: dto,
        });
    }

    async deleteCV(email: string, cvId: number) {
        const candidateId = await this.findCandidateByEmail(email);
        const cv = await this.prismaService.cV.findFirst({
            where: { id: cvId, candidateId: candidateId },
             select: { id: true }
        });
        if (!cv) {
            throw new NotFoundException(`CV record with ID ${cvId} not found or does not belong to the user.`);
        }

        try {
            return await this.prismaService.cV.delete({
                where: { id: cvId },
            });
        } catch (error) {
             if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003' || error.code === 'P2014' || error.code === 'P2025') {
                     throw new ForbiddenException(`Cannot delete CV with ID ${cvId} because it is currently linked to one or more applications.`);
                 }
             }
             console.error("Error deleting CV:", error);
             throw new InternalServerErrorException("Failed to delete CV.");
        }
    }
}
