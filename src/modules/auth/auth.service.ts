/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/core/dto/user.dto';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

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

    const payload = {
      sub: user.id,
      email: user.email,
      userType: user.userType,
      isOnboarded: user.isOnboarded,
    };

    return {
      access_token: this.jwtService.sign(payload),
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