import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { expect } from 'chai';

import { AppModule } from '../../src/app/app.module';
import AuthService from '../../src/app/domain/services/auth.service';

describe('User APIs (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(AuthService)
    .useValue({ validate: () => true })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });
  it('/api/v1/users (GET)', async () => {
    const res =  await request(app.getHttpServer())
      .get('/api/v1/users')
      expect(res.status).equal(400);
  });
  it('/api/v1/users (POST):: unhappy path', async () => {
    const res =  await request(app.getHttpServer())
      .post('/api/v1/users')
      .set({ Authorization: 'TOKEN' })
      .send({email:"", name:"test", password: "test"});
      expect(res.status).equal(400);
  });
});
