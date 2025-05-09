import { Controller, Get, Res, UseGuards, Request, Post, Body } from '@nestjs/common';
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
  async googleLoginCallBack(
    @Request() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const user = (req as any).user;
    if (!user || !user.access_token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    res.cookie('access_token', user.access_token, { httpOnly: true });

    try {
      res.redirect('http://localhost:3000/profile');
    } catch (error) {
      return res.json({
        message: 'Google login successful',
        access_token: user.access_token,
        user: {
          email: user.email,
          fullName: user.fullName,
        },
      });
    }
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
  async login(@Request() req: AuthenticatedRequest, @Res() res: Response) {
    const loginRes = await this.authService.login((req as any).user); // Chỉ truyền 1 tham số
    (req.session as any).user = {
      email: loginRes.user.email,
      fullName: loginRes.user.fullName,
      userType: loginRes.user.userType,
    };
    const response = {
      user: {
        email: loginRes.user.email,
        fullName: loginRes.user.fullName,
        userType: loginRes.user.userType,
      },
      access_token: loginRes.access_token,
      message: loginRes.message,
    };
    return res.json(response);
  }

  @Post('logout')
  async logout(@Request() req: AuthenticatedRequest, @Res() res: Response) {
    await this.authService.logout(req.session);
    res.clearCookie('sessionId');
    res.clearCookie('access_token');
    return res.json({ message: 'Logged out successfully' });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  async me(@Request() req: AuthenticatedRequest) {
    const user = (req as any).user;
    return {
      email: user.email,
      fullName: user.fullName,
    };
  }
}