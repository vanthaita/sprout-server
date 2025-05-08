import { Global, Module, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { redisClient, connectRedis, disconnectRedis } from '../config/redis.config';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useValue: redisClient,
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule implements OnModuleInit, OnApplicationShutdown {
  async onModuleInit() {
    await connectRedis();
  }

  async onApplicationShutdown() {
    await disconnectRedis();
  }
}