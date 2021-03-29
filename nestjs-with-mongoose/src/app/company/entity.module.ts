import { MiddlewareConsumer, Module, NestModule, RequestMethod, Type } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '../../logger/logger.module';
import { DatabaseModule } from '../../database/database.module';
import { AuthMiddleware } from '../core/middleware/middleware';
import { SharedModule } from '../shared/shared.module';
import { CompanyController } from './controller/company.controller';
import { CompanyService } from './services/company.service';

@Module({
  imports: [
    SharedModule,
    LoggerModule,
    DatabaseModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule
    .forFeature(
      [
        { name: 'company', schema: CompanySchema }
      ]),
  ],
  providers: [CompanyService],
  exports : [],
  controllers: [CompanyController]
})
export class CompanyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: '/api/v1/company', method: RequestMethod.ALL});
  }
}
