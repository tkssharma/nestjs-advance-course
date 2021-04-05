import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { BlogController } from './controllers/blog.controller';
import { ProductController } from './controllers/product.controller';
import { UserController } from './controllers/user.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { FirebaseAuthService } from './services/firebase.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule
  ],
  controllers: [AppController, AuthController, UserController, BlogController, ProductController],
  providers: [FirebaseAuthService],
  exports: [FirebaseAuthService]
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: '/api/v1', method: RequestMethod.ALL});
  }
}