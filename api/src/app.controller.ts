import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('count')
  async getCount(): Promise<string> {
    await this.appService.setCount(1);

    const count = await this.appService.getCount();

    if (count === null) {
      return 'Count not found';
    }

    return count;
  }
}
