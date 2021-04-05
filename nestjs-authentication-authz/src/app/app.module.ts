import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { FirebaseAuthService } from './services/firebase.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    CacheModule,
    DatabaseModule.forRoot(),
    MongooseModule.forFeature([
      { name: 'user', schema: UserSchema },
      { name: 'company', schema: CompanySchema }
    ])
  ],
  controllers: [AppController, AuthController],
  providers: [FirebaseAuthService],
  exports: [FirebaseAuthService]
})
export class AppModule { }
