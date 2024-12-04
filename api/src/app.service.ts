import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: RedisClientType,
  ) {}

  async getCount(): Promise<string | null> {
    return await this.redisClient.get('key');
  }

  async setCount(count: number): Promise<string> {
    return await this.redisClient.set('key', count.toString());
  }
}
