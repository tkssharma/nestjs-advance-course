import { Injectable } from '@nestjs/common';

import { DEFAULT_CONFIG } from './config.default';
import { ConfigData } from './config.interface';

/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class ConfigService {
  private config: ConfigData;

  constructor(data: ConfigData = DEFAULT_CONFIG) {
    this.config = data;
  }

  /**
   * Loads the config from environment variables.
   */
  public lofusingDotEnv() {
    this.config = this.parseConfigFromEnv(process.env);
  }

  private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
    return {
      env: env.NODE_ENV || DEFAULT_CONFIG.env,
      port: env.PORT ? parseInt(env.PORT, 10) : DEFAULT_CONFIG.port,
      mongo: env.MONGO || DEFAULT_CONFIG.mongo,
      logLevel: env.LOG_LEVEL || DEFAULT_CONFIG.logLevel,
      gatekeeperServiceUrl: env.GATEKEEPER_SERVICE_URL || DEFAULT_CONFIG.gatekeeperServiceUrl
    };
  }
  public get(): Readonly<ConfigData> {
    return this.config;
  }
}
