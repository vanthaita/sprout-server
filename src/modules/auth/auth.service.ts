import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserType } from '../../../generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  validateOrCreateGoogleUser(arg0: { email: any; fullName: any; googleId: any; }) {
    throw new Error('Method not implemented.');
  }
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
    
    const payload = { sub: user.id, email: user.email, userType: user.userType,  fullName: user.fullName };
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
    const payload = { sub: user.id, email: user.email, userType: user.userType, fullName: user.fullName };
    return {
      user,
      access_token: this.jwtService.sign(payload),
      message: 'Login successful',
    };
  }

  async logout() {
    return { message: 'Logged out successfully' };
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
  
  

  async getUserById(id: number) {
  const user = await this.prismaService.user.findUnique({ 
    where: { id },
    select: {
      id: true,
      email: true,
      fullName: true,
      userType: true
    }
  });

  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  return user;
}
async validateOrCreateGoogleUser1(profile: {
  email: string;
  fullName: string;
  googleId: string;
}) {
  let user = await this.prismaService.user.findUnique({
    where: { email: profile.email }
  });

  if (!user) {
    user = await this.prismaService.user.create({
      data: {
        email: profile.email,
        fullName: profile.fullName,
        googleId: profile.googleId,
        userType: 'CANDIDATE' // hoặc loại user mặc định
      }
    });
  }

  return user;
}
}