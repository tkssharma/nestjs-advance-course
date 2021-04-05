import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { Logger } from './logger';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
