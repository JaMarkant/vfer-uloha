import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesystemService {
  constructor(private readonly configService: ConfigService) {}

  public getTempFilePath(filePath: string): string {
    return path.join(
      process.cwd(),
      this.configService.get('TEMP_DIR_NAME'),
      filePath,
    );
  }

  public async appendFile(filePath: string, content: string): Promise<void> {
    await fs.appendFile(filePath, content);
  }
}
