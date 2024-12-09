import { AppService } from './app.service';
import { RedisClientType } from 'redis';
import { FilesystemService } from './filesystem/filesystem.service';
import { createMock } from '@golevelup/ts-jest';
import { DeepMocked } from '@golevelup/ts-jest/lib/mocks';
import * as os from 'node:os';

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

  describe('processTrack', () => {
    it('correctly processes track with count', async (): Promise<void> => {
      jest
        .spyOn(filesystemService, 'getTempFilePath')
        .mockReturnValueOnce('/some/path');
      jest.spyOn(filesystemService, 'appendFile');

      jest.spyOn(appService, 'addCount').mockReturnValueOnce(Promise.resolve());

      const track = { test: 1, count: 1 };
      await appService.processTrack(track);

      expect(filesystemService.getTempFilePath).toHaveBeenCalledWith(
        'bodies.txt',
      );
      expect(filesystemService.appendFile).toHaveBeenCalledWith(
        '/some/path',
        `{"test":1,"count":1}${os.EOL}`,
      );
      expect(appService.addCount).toHaveBeenCalledWith(track.count);
    });

    it('correctly processes track without count', async (): Promise<void> => {
      jest
        .spyOn(filesystemService, 'getTempFilePath')
        .mockReturnValueOnce('/some/path');
      jest.spyOn(filesystemService, 'appendFile');
      jest.spyOn(appService, 'addCount');

      const track = { test: 1 };
      await appService.processTrack(track);

      expect(filesystemService.getTempFilePath).toHaveBeenCalledWith(
        'bodies.txt',
      );
      expect(filesystemService.appendFile).toHaveBeenCalledWith(
        '/some/path',
        `{"test":1}${os.EOL}`,
      );
      expect(appService.addCount).not.toHaveBeenCalled();
    });

    it('throws on incorrect appendFile', async (): Promise<void> => {
      jest
        .spyOn(filesystemService, 'getTempFilePath')
        .mockReturnValueOnce('/some/path');
      jest.spyOn(filesystemService, 'appendFile').mockImplementation(() => {
        throw new Error('File append error!');
      });
      jest.spyOn(appService, 'addCount');
      const track = { test: 1 };

      await expect(
        async () => await appService.processTrack(track),
      ).rejects.toThrow('File append error!');

      expect(filesystemService.getTempFilePath).toHaveBeenCalledWith(
        'bodies.txt',
      );
      expect(filesystemService.appendFile).toHaveBeenCalledWith(
        '/some/path',
        `{"test":1}${os.EOL}`,
      );
      expect(appService.addCount).not.toHaveBeenCalled();
    });
  });
});
