/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UserDto } from '../../core/dto/user.dto';
import { plainToInstance } from 'class-transformer'; 

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

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
        });
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
        const existingUserCandidate = await this.prismaService.candidate.findUnique({
            where: {
                userId: existingUser.id
            }
        })

        if(existingUserCandidate) {
            return true
        }
        return false
    }
}