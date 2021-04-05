/**
 * Configuration data for the app.
 */

export interface RedisConfig {
  host: string;
  port: string;
  ttl: number;
}
export interface ConfigData {
  /**
   * The name of the environment.
   * @example 'test', 'development', 'staging', 'production'
   */
  env: string;

  /** The port number of the http server to listen on. */
  port: number;

  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel?: string;
}
