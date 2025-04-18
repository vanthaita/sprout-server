/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from 'src/core/dto/user.dto';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private prismaService: PrismaService,
    ) {}
    
    async authenticate(token: string) {
        const profile = await this.getProfile(token);
        let user = await this.usersService.findOneUserByEmail(profile?.data.email)

        if(!user) {
            const createUserDto: CreateUserDto = {
                email: profile?.data.email,
                fullName: profile?.data.name,
                userType: 'CANDIDATE',
            }

            user = await this.usersService.createUser(createUserDto);
        }
        
        const payload = { sub: user.id, email: user.email, userType: user.userType }
        

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
    async getProfile(token: string) {
        try {
          return axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
          );
        } catch (error) {
          console.error('Failed to revoke the token:', error);
        }
    }
}