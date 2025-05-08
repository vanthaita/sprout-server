import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserType } from '../../../generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async authenticate(token: string) {
    const profile = await this.getProfile(token);
    let user = await this.prismaService.user.findUnique({ where: { email: profile.email } });

    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          email: profile.email,
          fullName: profile.name,
          userType: UserType.CANDIDATE,
        },
      });
    }
    
    const payload = { sub: user.id, email: user.email, userType: user.userType };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterUserDto) {
    const { email, password, fullName, userType } = registerDto;
    const existingUser = await this.prismaService.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        userType: userType as UserType,
      },
    });
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (user && user.passwordHash && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, userType: user.userType };
    return {
      user,
      access_token: this.jwtService.sign(payload),
      message: 'Login successful',
    };
  }

  async logout(session: any) {
    return new Promise((resolve, reject) => {
      session.destroy((err: any) => {
        if (err) {
          console.error('Failed to destroy session:', err);
          reject(new Error('Failed to destroy session'));
        } else {
          resolve({ message: 'Logged out successfully' });
        }
      });
    });
  }

  async getProfile(token: string) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
      );
      return response.data;
    } catch (error) {
      console.error('Failed to get profile:', error);
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}