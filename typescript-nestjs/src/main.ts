import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';

import 'reflect-metadata';
(async () => {
  const app = await NestFactory.create(AppModule, {cors: true});
  SwaggerModule.setup('api/v1', app, createDocument(app));
  await app.listen(process.env.PORT || 3000);
  console.info('SERVER IS RUNNING ON PORT', process.env.PORT || 3000);
})();
