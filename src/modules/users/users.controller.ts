import { Controller, Get, UnauthorizedException, UseGuards, Request, Patch, Body, Post, UploadedFile, UseInterceptors } from '@nestjs/common'; 
import { UsersService } from './users.service';
import { AuthGuard as JWTAuthGuard } from '../../core/guard/authenticated.guard';

import { UpdateUserDto, UserDto } from '../../core/dto/user.dto';
import { AuthenticatedRequest } from '../../core/type/interface';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JWTAuthGuard)
  async getUserDetails(
    @Request() req: AuthenticatedRequest 
  ) {
    return this.usersService.getUser(req.user.email);
  }
  @Get('check-candidate')
  @UseGuards(JWTAuthGuard)
  async checkUserCandidateCreated(
    @Request() req: AuthenticatedRequest 
  ) {
    return this.usersService.checkUserProfileCreated(req.user.email);
  }
  @Post('avatar')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileAvatar(
    @Request() req: AuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.usersService.uploadAvatar(file, req.user.email);
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