import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto, UpdateCandidateDto } from './dto/candidate';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEducationDto, UpdateEducationDto } from './dto/education';
import { Prisma } from '../../../generated/prisma/client';
import { CreateWorkExperienceDto, UpdateWorkExperienceDto } from './dto/work-experience';
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
    
    return await this.prismaService.candidate.create({
      data: {
        ...candidateProfileCreateDto,
        user: {
          connect: {
            id: existingUser.id
          }
        },
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

    return await this.prismaService.candidate.update({
      where: { userId: existingUser.id },
      data: {
        ...candidateProfileUpdateDto,
        dateOfBirth: candidateProfileUpdateDto.dateOfBirth 
          ? new Date(candidateProfileUpdateDto.dateOfBirth).toISOString() 
          : undefined
      }
    });
  }
  
  async candidateProfileDetails(email: string) {
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
                    status: true
                  }
                }
              }
            }
          }
        } 
      }
    });
            
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    
    if (!existingUser.candidate) {
      throw new NotFoundException('Candidate profile not found');
    }

    return {
      ...existingUser.candidate,
      user: {
        email: existingUser.email,
        fullName: existingUser.fullName
      }
    };
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

  async addCV(email: string, dto: CreateCVDto) {
    const candidateId = await this.findCandidateByEmail(email);
    
    // If setting as primary, first unset any existing primary CV
    if (dto.isPrimary) {
      await this.prismaService.cV.updateMany({
        where: { 
          candidateId: candidateId,
          isPrimary: true 
        },
        data: { 
          isPrimary: false 
        }
      });
    }

    const data: Prisma.CVCreateInput = {
      candidate: { connect: { id: candidateId } },
      fileName: dto.fileName || '', // Gán giá trị mặc định nếu undefined
      fileUrl: dto.fileUrl || '',   // Gán giá trị mặc định nếu undefined
      fileType: dto.fileType || undefined, // Để undefined nếu không cung cấp
      isPrimary: dto.isPrimary || false,   // Gán giá trị mặc định nếu undefined
    };

    // Loại bỏ các trường undefined để tránh lỗi với Prisma
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    return this.prismaService.cV.create({
      data,
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

    // If setting as primary, first unset any existing primary CV
    if (dto.isPrimary) {
      await this.prismaService.cV.updateMany({
        where: { 
          candidateId: candidateId,
          isPrimary: true,
          NOT: { id: cvId }
        },
        data: { 
          isPrimary: false 
        }
      });
    }

    const dataToUpdate: Prisma.CVUpdateInput = { ...dto };
    // Loại bỏ các trường undefined để tránh lỗi với Prisma
    Object.keys(dataToUpdate).forEach((key) => {
      if (dataToUpdate[key] === undefined) {
        delete dataToUpdate[key];
      }
    });

    return this.prismaService.cV.update({
      where: { id: cvId },
      data: dataToUpdate,
    });
  }

  async deleteCV(email: string, cvId: number) {
    const candidateId = await this.findCandidateByEmail(email);
    const cv = await this.prismaService.cV.findFirst({
      where: { id: cvId, candidateId: candidateId },
    });
    if (!cv) {
      throw new NotFoundException(`CV record with ID ${cvId} not found or does not belong to the user.`);
    }

    // Check if CV is used in any applications
    const applications = await this.prismaService.application.findFirst({
      where: { cvId: cvId }
    });

    if (applications) {
      throw new ForbiddenException(`Cannot delete CV with ID ${cvId} because it is linked to one or more applications.`);
    }

    try {
      return await this.prismaService.cV.delete({
        where: { id: cvId },
      });
    } catch (error) {
      console.error("Error deleting CV:", error);
      throw new InternalServerErrorException("Failed to delete CV.");
    }
  }

  async getPrimaryCV(email: string) {
    const candidateId = await this.findCandidateByEmail(email);
    return this.prismaService.cV.findFirst({
      where: {
        candidateId: candidateId,
        isPrimary: true
      }
    });
  }
}