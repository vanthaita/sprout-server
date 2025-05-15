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
  async googleLoginCallBack(
    @Request() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const googleToken = req.user?.accessToken;
    const authRes = await this.authService.authenticate(googleToken);
    res.cookie('access_token', authRes.access_token, { httpOnly: true });
    res.redirect(`http://localhost:3000/en/onboarding`);
  }
}
}