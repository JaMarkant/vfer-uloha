import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

export const redisProvider = {
  provide: 'REDIS_CLIENT',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return await createClient({
      url: configService.get<string>('REDIS_URL'),
    })
      .on('error', (error) => console.log('Redis Client Error', error))
      .connect();
  },
};
