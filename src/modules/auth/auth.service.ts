/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto, UserDto } from 'src/core/dto/user.dto';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
class GoogleProfileDto {
  @ApiProperty({
    description: 'User email from Google',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User full name from Google',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User avatar URL from Google',
    example: 'https://lh3.googleusercontent.com/a/...',
  })
  avatar: string;
}

class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private prismaService: PrismaService
  ) {}

  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired token',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async authenticate(token: string) {
    const profile = await this.getProfile(token);
    let user = await this.usersService.findOneUserByEmail(profile?.data.email);

    if (!user) {
      const createUserDto: CreateUserDto = {
        email: profile?.data.email,
        fullName: profile?.data.name,
        userType: 'NONE',
        avatar: profile?.data.avatar,
      };

      user = await this.usersService.createUser(createUserDto);
    }
    return this.generateTokens(user)
  }

  private async generateTokens(user: UserDto) {
    const payload = { sub: user.id, email: user.email, userType: user.userType, isOnboarded: user.isOnboarded };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_SESSION_EXPIRATION,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_RT_SESSION_EXPIRATION,
    });
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    return { access_token: accessToken, refresh_token: refreshToken };
  }
  async getAccessTokenUser(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      if (!payload) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const user = await this.prismaService.user.findFirst({
        where: { refreshToken },
      });
      if (!user) throw new UnauthorizedException('Invalid user');
      const newAccessToken = this.jwtService.sign(
        { sub: user.id, email: user.email, userType: user.userType, isOnboarded: user.isOnboarded },
        { expiresIn: process.env.JWT_SESSION_EXPIRATION },
      );
      console.log("Token: ",user.userType);
      const newRefreshToken = this.jwtService.sign(
        { sub: user.id, email: user.email, userType: user.userType, isOnboarded: user.isOnboarded },
        { 
          expiresIn: process.env.JWT_RT_SESSION_EXPIRATION || '7d' 
        }
      );
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken },
      });


      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (err) {
      console.error('Token error:', err.message);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  
  async signIn(signInDto: SignInDto) {
    const { password, email } = signInDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!user.passwordHash) {
      throw new UnauthorizedException('User not signed up with password'); 
    }
    const passwordMatch = await argon2.verify(user.passwordHash, password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Password is incorrect');
    }
    const payload = { sub: user.id, email: user.email, userType: user.userType }; 
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_RT_SESSION_EXPIRATION,
    });
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
}

  async signUp(signUpDto: SignUpDto) {
    const { email, fullName, password } = signUpDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        fullName,
        passwordHash: hashedPassword,
      },
    });

    return {
      userId: newUser.id,
      email: newUser.email,
    };
  }
  @ApiResponse({
    status: 200,
    description: 'Google user profile',
    type: GoogleProfileDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Failed to fetch user profile - Invalid token',
  })
  async getProfile(token: string) {
    try {
      return axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
      );
    } catch (error) {
      console.error('Failed to revoke the token:', error);
      throw error;
    }
  }
}