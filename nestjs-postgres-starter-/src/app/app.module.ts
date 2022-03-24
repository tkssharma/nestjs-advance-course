import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/app.controller';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [DomainModule, TerminusModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }
