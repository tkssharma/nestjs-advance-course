import { Module } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { CatsModule } from './app/domain/cat.module';

@Module({
  imports: [
    CatsModule
  ],
  controllers: [AppController]
})
export class AppModule {
}
