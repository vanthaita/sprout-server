import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'; 
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { GoogleStrategy } from 'src/core/strategy/google.strategy';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { SessionModule } from 'nestjs-session';
import RedisStore from 'connect-redis';
import { redisClient } from 'src/core/config/redis.config';
import { LocalStrategy } from './local.strategy';

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
    SessionModule.forRoot({
      session: {
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({ client: redisClient }),
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    PrismaService, 
    UsersService, 
    GoogleStrategy,
    CloudinaryService,
    LocalStrategy,
  ],
})
export class AuthModule {} 