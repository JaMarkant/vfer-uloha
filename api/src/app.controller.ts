import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('track')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async setTrack(@Body() body: object): Promise<void> {
    await this.appService.processTrack(body);
  }

  @Get('count')
  public async getCount(): Promise<string> {
    const count = await this.appService.getCount();

    if (count === null) {
      return 'Count not found';
    }

    return count.toString();
  }
}
