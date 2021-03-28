import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DbConfigError } from './db.errors';
import { DbConfig } from './db.interface';
@Module({})
export class DbModule {
  private static getConnectionOptions( dbconfig: DbConfig): TypeOrmModuleOptions {
    const connectionOptions = DbModule.getConnectionOptionsPostgres();
    return {
      ...connectionOptions,
      entities: dbconfig.entities,
      synchronize: false,
      logging: false,
    };
  }

  private static getConnectionOptionsPostgres(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      keepConnectionAlive: true
    };
  }

  public static forRoot(dbconfig: DbConfig): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [],
          useFactory: () => DbModule.getConnectionOptions(dbconfig),
          inject: [],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
