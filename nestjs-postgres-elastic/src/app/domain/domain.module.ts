import { MiddlewareConsumer, Module, NestModule, RequestMethod, Type, CacheModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { DbModule } from '../../db/db.module';
import { RedisCacheModule } from '../redis/redis.module';
import { SearchModule } from '../search/search.module';
import { PostController } from './controller/user.controller';

export const ALL_ENTITIES = fs.readdirSync(path.join(path.dirname(__filename), 'entities'))
  .filter((file) => (path.extname(file) === '.js' || path.extname(file) === '.ts') && !file.endsWith('.d.ts'))
  .map((file) => require(`./entities/${file}`).default as Type<any>);

export const ALL_SERVICES = fs.readdirSync(path.join(path.dirname(__filename), 'services'))
  .filter((file) => (path.extname(file) === '.js' || path.extname(file) === '.ts') && !file.endsWith('.d.ts'))
  .filter((file) => file.indexOf('.spec') === -1)
  .map((file) => require(`./services/${file}`).default as Type<any>);

@Module({
  imports: [
    SearchModule,
    RedisCacheModule,
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    DbModule.forRoot({ entities: ALL_ENTITIES }),
    TypeOrmModule.forFeature(ALL_ENTITIES),
  ],
  controllers: [PostController],
  providers: [
    ...ALL_SERVICES,
  ],
  exports: [...ALL_SERVICES],
})
export class DomainModule { }
