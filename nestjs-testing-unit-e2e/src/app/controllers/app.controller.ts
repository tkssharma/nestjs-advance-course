import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('/api/v1/health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) { }

  @ApiTags('health')
  @Get('/')
  @HealthCheck()
  public check() {
    return this.health.check([
      async () => this.db.pingCheck('typeorm'),
    ]);
  }
}
