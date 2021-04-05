import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as CONSTANT from '../constants.api';
import admin from '../../main';
import { RedisCacheService } from './redis.service';
import { Logger } from '../../logger/logger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class FirebaseAuthService {

  constructor(
    private logger: Logger,
    private redisCacheService: RedisCacheService,
    @InjectModel('user') private readonly userModel: Model<User>
  ) { }

  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException(CONSTANT.INVALID_BEARER_TOKEN);
    }
    return match[1];
  }
  public async authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(tokenString);
      this.logger.info(`${JSON.stringify(decodedToken)}`);
      const key = `${decodedToken.email}:${tokenString.split('.')[2].substr(0, 16)}`;
      const data =  await this.redisCacheService.get(key);
      if (! data) {
        throw new UnauthorizedException('User session does not exist in Redis');
      }
      return data;
    } catch (err) {
      this.logger.error(`error while authenticate request ${err.message}`)
      throw new UnauthorizedException(err.message);
    }
  }
  async buildRequestUserProfile(email: string, uid: string) {
    const user = await this.userModel.findOne({ email }).populate('companyId');
    if (user) {
      return {
        email: user.email,
        uid: user.uid,
        role: user.role,
      };
    } else {
      return {
        email,
        uid
      };
    }
 }
}
