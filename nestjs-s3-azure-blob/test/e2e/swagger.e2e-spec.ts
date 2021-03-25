import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { expect } from 'chai';

import { AppModule } from '../../src/app/app.module';
describe('Swagger (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });
  it('/api (GET)', async() => {
    const res =  await request(app.getHttpServer())
    .get('/api/v1')
    expect(res.status).equal(400);
  });

  it('/api/v1/health (GET)', async () => {
    const res =  await request(app.getHttpServer())
      .get('/api/v1/health')
      .set({ Authorization: 'TOKEN' })
      expect(res.status).equal(200);
  });
});
