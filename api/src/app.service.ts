import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { FilesystemService } from './filesystem/filesystem.service';
import * as os from 'node:os';

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: RedisClientType,
    private readonly filesystemService: FilesystemService,
  ) {}

  public async getCount(): Promise<number | null> {
    const count = await this.redisClient.get('count');
    if (count === null) {
      return null;
    }

    return Number(count);
  }

  public async addCount(count: number): Promise<void> {
    const currentCount = (await this.getCount()) || 0;
    await this.redisClient.set('count', currentCount + count);
  }

  public async processTrack(track: object): Promise<void> {
    await this.filesystemService.appendFile(
      this.filesystemService.getTempFilePath('bodies.txt'),
      `${JSON.stringify(track)}${os.EOL}`,
    );

    if ('count' in track && typeof track.count === 'number') {
      await this.addCount(track.count);
    }
  }
}
