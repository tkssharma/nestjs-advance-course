/**
 * Configuration data for the app.
 */
export interface ConfigData {
  env: string;

  /** The port number of the http server to listen on. */
  port: number;

  /** Database connection details. */
  mongo?: string;

  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;

  gatekeeperServiceUrl: string;
}
