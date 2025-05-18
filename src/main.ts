/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ResponseInterceptor } from './core/interceptor/response.interceptor';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: {
        origin: ['http://localhost:3000', '*'],
        credentials: true,
      },
    },
  );
  const config = new DocumentBuilder()
    .setTitle('Sprout Career')
    .setDescription('The Sprout Career API description')
    .setVersion('1.0')
    .addTag('jobs')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(ConfigService);

  const globalPrefix = configService.get<string>('API_PREFIX') || 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  const COOKIE_SECRET = configService.get<string>('COOKIE_SECRET');
  app.use(cookieParser(COOKIE_SECRET));

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  const PORT = configService.get<string>('PORT') || 8386;
  const HOST = configService.get<string>('HOST') || '0.0.0.0';

  await app.listen(PORT, HOST);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();