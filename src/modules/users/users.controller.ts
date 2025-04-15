import { Controller, Get, UnauthorizedException, UseGuards, Request } from '@nestjs/common'; 
import { UsersService } from './users.service';
import { AuthGuard as JWTAuthGuard } from '../../core/guard/authenticated.guard';
import { Request as ExpressRequest } from 'express';
import { UserType } from 'generated/prisma';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    user_type: UserType;
    accessToken: string;
    email: string;
    id: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JWTAuthGuard)
  async getUserDetails(
    @Request() req: AuthenticatedRequest 
  ) {
    const accessToken = req.cookies['access_token'];
    if (!accessToken) {
      throw new UnauthorizedException('No access token');
    }
    return this.usersService.getUser(req.user.email);
  }
}