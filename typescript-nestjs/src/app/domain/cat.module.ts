import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from '../common/auth.middleware';
import { CatController } from './cat.controller';
import { CatsService } from './cat.service';

@Module({
  controllers: [CatController],
  providers: [CatsService],
})
export class CatsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .exclude('/api/v1/cat/something')
      .forRoutes({path: '/api/v1', method : RequestMethod.ALL});
  }
}