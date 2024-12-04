import { AppService } from './app.service';
import { RedisClientType } from 'redis';
import { FilesystemService } from './filesystem/filesystem.service';
import { createMock } from '@golevelup/ts-jest';
import { DeepMocked } from '@golevelup/ts-jest/lib/mocks';

describe('AppService', () => {
  let redisClient: DeepMocked<RedisClientType>;
  let filesystemService: DeepMocked<FilesystemService>;
  let appService: AppService;

  beforeEach(() => {
    redisClient = createMock<RedisClientType>();
    filesystemService = createMock<FilesystemService>();

    appService = new AppService(redisClient, filesystemService);
  });

  describe('getCount', () => {
    it('returns value of redisClient get converted to number', async (): Promise<void> => {
      jest.spyOn(redisClient, 'get').mockReturnValueOnce(5);

      const result = await appService.getCount();

      expect(redisClient.get).toHaveBeenCalledWith('count');
      expect(result).toEqual(5);
    });

    it('returns null if redis client returns null', async (): Promise<void> => {
      jest.spyOn(redisClient, 'get').mockReturnValueOnce(null);

      const result = await appService.getCount();

      expect(redisClient.get).toHaveBeenCalledWith('count');
      expect(result).toEqual(null);
    });
  });

  describe('addCount', () => {
    it('correctly adds number to already existing value in redis', async (): Promise<void> => {
      jest.spyOn(redisClient, 'get').mockReturnValueOnce(5);

      await appService.addCount(3);

      expect(redisClient.get).toHaveBeenCalledWith('count');
      expect(redisClient.set).toHaveBeenCalledWith('count', 8);
    });

    it('correctly initializes first number', async (): Promise<void> => {
      jest.spyOn(redisClient, 'get').mockReturnValueOnce(null);

      await appService.addCount(3);

      expect(redisClient.get).toHaveBeenCalledWith('count');
      expect(redisClient.set).toHaveBeenCalledWith('count', 3);
    });
  });
});
