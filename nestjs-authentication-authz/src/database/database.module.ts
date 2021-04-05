import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DbConfigError, DbError } from './db.error';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({})
export class DatabaseModule {

  public static getNoSqlConnectionOptions(config: ConfigService): MongooseModuleOptions {
    const dbdata = config.get().mongo;

    if (!dbdata) {
      throw new DbConfigError('Database config is missing');
    }
    return {
      uri: dbdata
    };
  }
  public static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => DatabaseModule.getNoSqlConnectionOptions(configService),
        inject: [ConfigService],
      }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
