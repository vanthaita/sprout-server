import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ResponseInterceptor } from './core/interceptor/response.interceptor';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe, Logger } from '@nestjs/common';
import passport from 'passport';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';

const logger = new Logger('Main');

async function bootstrap() {
  try {
    const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    
    redisClient.on('error', (err) => logger.error(`Redis Client Error: ${err.message}`));
    redisClient.on('connect', () => logger.log('Connected to Redis successfully'));

    const RedisStore = connectRedis(session);
    const redisStore = new RedisStore({
      client: redisClient,
      prefix: 'sess:',
      ttl: 86400,
    });

    const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(),
      {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        cors: {
          origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
          credentials: true,
          methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        },
      },
    );

    const configService = app.get(ConfigService);

    app.use(
      session({
        store: redisStore,
        secret: configService.get<string>('SESSION_SECRET') || 'strong-secret-key',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
          httpOnly: true,
          secure: configService.get<string>('NODE_ENV') === 'production',
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'lax',
          domain: configService.get<string>('COOKIE_DOMAIN'),
        },
        name: 'sessionId',
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user: any, done) => {
      done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
      done(null, user);
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    app.setGlobalPrefix(configService.get<string>('API_PREFIX') || 'api/v1');
    
    app.use(cookieParser(configService.get<string>('COOKIE_SECRET')));

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(
      new ResponseInterceptor(reflector),
    );

    const PORT = configService.get<number>('PORT') || 3002;
    const HOST = configService.get<string>('HOST') || '0.0.0.0';

    await app.listen(PORT, HOST);
    logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.log(`Environment: ${configService.get<string>('NODE_ENV')}`);

    process.on('SIGTERM', async () => {
      logger.log('SIGTERM received. Shutting down gracefully...');
      await app.close();
      redisClient.quit();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.log('SIGINT received. Shutting down gracefully...');
      await app.close();
      redisClient.quit();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start application', error.stack);
    process.exit(1);
  }
}

bootstrap();