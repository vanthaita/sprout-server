import { createClient, RedisClientType } from 'redis';
import { Logger } from '@nestjs/common';

const logger = new Logger('RedisConfig');

export const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 5) {
        logger.error('Too many retries on Redis. Connection terminated');
        return new Error('Too many retries');
      }
      return Math.min(retries * 100, 5000); // Exponential backoff
    },
  },
});

redisClient.on('error', (err) => logger.error(`Redis Client Error: ${err.message}`));
redisClient.on('connect', () => logger.log('Redis connecting...'));
redisClient.on('ready', () => logger.log('Redis connected successfully'));
redisClient.on('reconnecting', () => logger.warn('Redis reconnecting...'));

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    try {
      await redisClient.connect();
    } catch (err) {
      logger.error('Failed to connect to Redis', err.stack);
      throw err;
    }
  }
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
};