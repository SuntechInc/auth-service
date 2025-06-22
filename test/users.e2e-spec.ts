import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'John', email: 'john@example.com', password: 'secret12' })
      .expect(201);
    expect(res.body).toHaveProperty('id');
  });

  it('/users/:id (GET)', async () => {
    const create = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Mary', email: 'mary@example.com', password: 'secret12' })
      .expect(201);
    const id = create.body.id;
    await request(app.getHttpServer())
      .get(`/users/${id}`)
      .expect(200);
  });
});
