import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { GoogleStrategy } from '../../core/strategy/google.strategy';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { LocalStrategy } from '../../core/strategy/local.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthenticatedGuard } from '../../core/guard/authenticated.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { 
        expiresIn: process.env.JWT_SESSION_EXPIRATION || '1h' 
      },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    GoogleStrategy,
    CloudinaryService,
    LocalStrategy,
    JwtAuthGuard,
    AuthenticatedGuard,
  ],
  exports: [AuthenticatedGuard, JwtAuthGuard],
})
export class AuthModule {}