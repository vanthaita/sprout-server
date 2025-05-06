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
    import { SessionModule } from 'nestjs-session';
    import { createClient } from 'redis';
    import RedisStore from 'connect-redis';
    import { redisClient } from '../../core/config/redis.config';
    import { LocalStrategy } from '../../core/strategy/local.strategy';

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
            store: new RedisStore({ client: redisClient as any }), // Ép kiểu tạm thời
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