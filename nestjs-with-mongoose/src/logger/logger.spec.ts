import * as chai from 'chai';
import * as spies from 'chai-spies';

import { DEFAULT_CONFIG } from '../config/config.default';
import { ConfigService } from '../config/config.service';
import { Logger } from './logger';
import { LogLevel } from './loglevel';

chai.use(spies);

const TEST_MESSAGE = 'test message';

describe('Logger', () => {
  let logger: Logger;

  const logLevels = [LogLevel.Error, LogLevel.Warn, LogLevel.Info, LogLevel.HTTP, LogLevel.Verbose, LogLevel.Debug, LogLevel.Silly];

  /* tslint:disable-next-line:no-empty */
  const noop = () => {};

  describe('constructor', () => {
    it('should create winston logger with correct log level', () => {
      for (const logLevel of logLevels) {
        const configService = new ConfigService({ ...DEFAULT_CONFIG, logLevel });
        logger = new Logger(configService);
        chai.expect(logger.logger.level).to.equal(logLevel);
      }
    });
  });

  describe('log', () => {
    it('should pass the message to winston logger, with log level overload', () => {
      const configService = new ConfigService();
      for (const logLevel of logLevels) {
        logger = new Logger(configService);
        const logSpy = chai.spy.on(logger.logger, 'log', noop);
        logger.log(logLevel, TEST_MESSAGE);
        chai.expect(logSpy).to.have.been.called.with.exactly(logLevel, TEST_MESSAGE);
      }
    });

    it('should pass the message to winston logger, without log level overload', () => {
      const configService = new ConfigService();
      logger = new Logger(configService);
      const logSpy = chai.spy.on(logger.logger, 'log', noop);
      logger.log(TEST_MESSAGE);
      chai.expect(logSpy).to.have.been.called.with.exactly(LogLevel.Info, TEST_MESSAGE);
    });
  });

  for (const logLevel of logLevels) {
    describe(logLevel, () => {
      it('should pass the message to winston logger', () => {
        const configService = new ConfigService();
        logger = new Logger(configService);
        const logSpy = chai.spy.on(logger.logger, 'log', noop);
        logger[logLevel](TEST_MESSAGE);
        chai.expect(logSpy).to.have.been.called.with.exactly(logLevel, TEST_MESSAGE);
      });
    });
  }
});
