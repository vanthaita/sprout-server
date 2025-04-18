import { Controller, Get, UnauthorizedException, UseGuards, Request, Patch, Body } from '@nestjs/common'; 
import { UsersService } from './users.service';
import { AuthGuard as JWTAuthGuard } from '../../core/guard/authenticated.guard';

import { UpdateUserDto, UserDto } from '../../core/dto/user.dto';
import { AuthenticatedRequest } from '../../core/type/interface';


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
  @Get('check-candidate')
  @UseGuards(JWTAuthGuard)
  async checkUserCandidateCreated(
    @Request() req: AuthenticatedRequest 
  ) {
    const accessToken = req.cookies['access_token'];
    if (!accessToken) {
      throw new UnauthorizedException('No access token');
    }
    return this.usersService.checkUserProfileCreated(req.user.email);
  }
  @Patch('me')
  @UseGuards(JWTAuthGuard)
  async updateUserDetails(
    @Request() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    const accessToken = req.cookies['access_token'];
    if (!accessToken) {
      throw new UnauthorizedException('No access token');
    } 
    return this.usersService.updateUser(req.user.email, updateUserDto);
  }

}