import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { CompanyModule } from './app/company/entity.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    DatabaseModule.forRoot(),
    ConfigModule,
    CompanyModule,
    LoggerModule
  ],
  controllers: [AppController]
})
export class AppModule {
}
