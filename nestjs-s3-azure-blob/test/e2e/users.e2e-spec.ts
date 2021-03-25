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
    const res = await request(app.getHttpServer())
      .get('/api/v1/users')
      .set({ Authorization: 'TOKEN' })
    expect(res.status).equal(200);
  });
  it('/api/v1/users (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/users')
      .set({ Authorization: 'TOKEN' })
      .send({ email: `testing${Math.floor(Math.random() * 10)}@gmail.com`, name: "test", password: "test" });
    expect(res.status).equal(201);
  });
  it('/api/v1/users/1 (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/users/1')
      .set({ Authorization: 'TOKEN' });
    expect(res.status).equal(200);
  });
});
