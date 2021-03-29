import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import * as Joi from 'joi';
import { HealthController } from './controllers/app.controller';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number(),
        NODE_ENV: Joi.string().required(),
        ELASTICSEARCH_NODE: Joi.string().required(),
        ELASTICSEARCH_INDEX: Joi.string().required(),
      }),
    }),
    DomainModule, TerminusModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }
