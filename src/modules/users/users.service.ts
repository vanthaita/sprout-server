/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UserDto } from '../../core/dto/user.dto';
import { plainToInstance } from 'class-transformer'; 
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService, private cloudinaryService: CloudinaryService) {}
    private extractPublicIdFromUrl(url: string): string {
        const parts = url.split('/');
        const fileName = parts[parts.length - 1];
        const publicId = fileName.split('.')[0];
        return publicId;
      }
    async createUser(userDataDto: CreateUserDto) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email: userDataDto.email },
        });

        if (existingUser) {
            throw new NotFoundException('User created!');
        }

        const createUser = await this.prismaService.user.create({
            data: userDataDto
        })
        
        return plainToInstance(UserDto, createUser);
    }

    async uploadAvatar(file: Express.Multer.File, email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: {
                email,
            },
            select: { avatar: true },
        })
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }

        if(existingUser && existingUser.avatar) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            const publicId = this.extractPublicIdFromUrl(existingUser.avatar as string);
            await this.cloudinaryService.deleteFile(publicId);
        }
        const uploadResult = await this.cloudinaryService.uploadFile(file);

        await this.prismaService.user.update({
            where: { email },
            data: { avatar: uploadResult.secure_url },
        });
    }

    async getUser(email: string): Promise<UserDto> {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        return plainToInstance(UserDto, existingUser);
    }
    async findOneUserByEmail(email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });
        return plainToInstance(UserDto, existingUser);
    }
    async updateUser(email: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        const updatedUser = await this.prismaService.user.update({
            where: { email },
            data: updateUserDto
        });
        return plainToInstance(UserDto, updatedUser);
    }

    async checkUserProfileCreated(email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            select: {
                isOnboarded: true,
                userType: true
            }
        });
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        return {
            isOnboarded: existingUser.isOnboarded,
            userType: existingUser.userType,
        };
    }

    async updateIsOnboarded(email: string) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
            select: {
                id: true,
                isOnboarded: true,
                userType: true
            }
        });
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        return this.prismaService.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                isOnboarded: true
            }
        });
    }
}