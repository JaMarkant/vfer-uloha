import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RedisModule } from './redis/redis.module';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
