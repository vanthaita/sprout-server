import { Controller, Get, Res, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response} from 'express';
import { AuthenticatedRequest } from 'src/core/type/interface';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('Google')
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
  
}
