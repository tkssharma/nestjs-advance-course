import { Controller, Get } from '@nestjs/common';

@Controller('/api/v1')
export class AppController {
  @Get('health')
  public getHealth(): string {
    return 'Health OK! From Gatekeeper Service';
  }

  @Get()
  public getApp(): string {
    return 'Gatekeeper Service Working!';
  }
}
