import { Controller, Get, Res, UseGuards, Request, Post, Body, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../core/type/interface';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthenticatedGuard } from '../../core/guard/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

   @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallBack(@Request() req, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('access_token', token.access_token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      domain: process.env.COOKIE_DOMAIN
    });
    return res.redirect(process.env.FRONTEND_REDIRECT_URL || 'http://localhost:3000');
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    const user = await this.authService.register(registerDto);
    return {
      email: user.email,
      fullName: user.fullName,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.json({ message: 'Logged out successfully' });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
async me(@Request() req: AuthenticatedRequest) {
  const user = req.user;
  
  // If fullName is already in the JWT payload
  if (user.fullName) {
    return {
      email: user.email,
      fullName: user.fullName,
    };
  }

  // If fullName is not in JWT, fetch from database
  const dbUser = await this.authService.getUserById(Number(user.id));
  
  if (!dbUser) {
    throw new NotFoundException('User not found');
  }

  return {
    email: user.email,
    fullName: dbUser.fullName,
  };
}
}