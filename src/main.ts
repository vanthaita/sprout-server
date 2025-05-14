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

const logger = new Logger('Main');

async function bootstrap() {
  try {
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

  
    app.use(passport.initialize());

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
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.log('SIGINT received. Shutting down gracefully...');
      await app.close();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start application', error.stack);
    process.exit(1);
  }
}

bootstrap();