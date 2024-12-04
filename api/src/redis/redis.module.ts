import { Module } from '@nestjs/common';
import { redisProvider } from './redis.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  exports: [redisProvider],
  providers: [redisProvider],
})
export class RedisModule {}
