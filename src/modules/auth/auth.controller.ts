import {
  Controller,
  Get,
  Res,
  UseGuards,
  Request,
  HttpStatus,
  Post,
  Body,
  UnauthorizedException,
  HttpException,
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
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { SignInDto, SignUpDto } from './dto/auth.dto';

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
  googleLogin() {}

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
    res.cookie('refresh_token', authRes.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.redirect(`${process.env.URL_REDIRECT}`);
  }


  @Post('check-token')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Check if refresh token is valid and refresh access token',
  })
  async checkToken(@Body() body: { refresh_token: string }) {
    const refreshToken = body.refresh_token;
    if(!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }       
    const { access_token, refresh_token } =
      await this.authService.getAccessTokenUser(refreshToken);
    return { access_token, refresh_token  };
  }

  
  @Post('sign-in')
  @ApiOperation({ summary: 'User sign-in' })
  @ApiBody({ type: SignInDto })
  async signIn(@Body() signInDto: SignInDto) {
    try {
      const { access_token, refresh_token } =
        await this.authService.signIn(signInDto);
      return { access_token, refresh_token };
    } catch (error) {
      console.error(error);
      throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'User sign-up' })
  @ApiBody({ type: SignUpDto })
  async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    await this.authService.signUp(signUpDto);
    return { message: 'Sign Up successful' };
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