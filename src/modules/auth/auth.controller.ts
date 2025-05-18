import {
  Controller,
  Get,
  Res,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/core/type/interface';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiExcludeEndpoint,
  ApiCookieAuth,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Initiate Google OAuth login',
    description: 'Redirects to Google OAuth consent screen',
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Redirect to Google OAuth',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Google authentication failed',
  })
  googleLogin() {
    // Handled by Passport
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiExcludeEndpoint()
  @ApiOperation({
    summary: 'Google OAuth callback',
    description: 'Handles the Google OAuth callback and sets access token cookie',
  })
  async googleLoginCallBack(
    @Request() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const googleToken = req.user?.accessToken;
    const authRes = await this.authService.authenticate(googleToken);
    res.cookie('access_token', authRes.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.redirect(`http://localhost:3000/en/onboarding`);
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  @ApiCookieAuth('access_token')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Returns the current authenticated user profile',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the user profile',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing access token',
  })
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}