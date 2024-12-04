import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesystemService } from './filesystem.service';

@Module({
  imports: [ConfigModule],
  exports: [FilesystemService],
  providers: [FilesystemService],
})
export class FilesystemModule {}
