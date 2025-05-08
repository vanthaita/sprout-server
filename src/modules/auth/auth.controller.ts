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
    const googleToken = req.user?.accessToken;
    const authRes = await this.authService.authenticate(googleToken);

    res.cookie('access_token', authRes.access_token, { httpOnly: true });
    res.redirect(`http://localhost:3000/profile`);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthenticatedRequest, @Res() res: Response) {
    const loginRes = await this.authService.login(req.user);
    return res.json(loginRes);
  }

  @Post('logout')
  async logout(@Request() req: AuthenticatedRequest, @Res() res: Response) {
    await this.authService.logout(req.session);
    res.clearCookie('connect.sid');
    res.clearCookie('access_token');
    return res.json({ message: 'Logged out successfully' });
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  async me(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}