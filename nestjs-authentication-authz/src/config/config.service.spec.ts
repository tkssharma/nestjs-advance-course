import * as chai from 'chai';

import { DEFAULT_CONFIG } from './config.default';
import { ConfigData } from './config.interface';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let config: ConfigService;

  beforeEach(() => {
    config = new ConfigService();
  });

  describe('constructor', () => {
    it('should use default config if parameterless', () => {
      chai.expect(config.get()).to.deep.equal(DEFAULT_CONFIG);
    });

    it('should use passed config', () => {
      const testConfig: ConfigData = {
        env: 'testenv',
        port: 1234,
        logLevel: 'testloglevel',
        newRelicKey: 'testrelickey',
        auth: {
          jwksuri: 'testUri',
          authProvider: 'auth0',
          tokenIssuer: '',
        },
        socket: {
          appId: 'testAppId',
          key: 'testKey',
          secret: 'testSecret',
          cluster: 'testCluster',
          useTLS: true,
          channelName: 'testChannel',
          socketProvider: 'testProvider'
        }
      };
      config = new ConfigService(testConfig);
      chai.expect(config.get()).to.deep.equal(testConfig);
    });
  });

  describe('loadFromEnv', () => {
    it('should load base config properties from environment', () => {
      process.env.ENV = 'testenv';
      process.env.PORT = '1234';
      process.env.LOG_LEVEL = 'testloglevel';
      process.env.NEW_RELIC_KEY = 'testrelickey';
      config.loadFromEnv();
      chai.expect(config.get()).to.deep.equal({
        env: 'testenv',
        port: 1234,
        logLevel: 'testloglevel',
        newRelicKey: 'testrelickey',
      });
    });

  });
});
