/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto, UserDto } from 'src/core/dto/user.dto';
import { plainToInstance } from 'class-transformer'; 

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async getUser(email: string): Promise<UserDto> {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
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
}