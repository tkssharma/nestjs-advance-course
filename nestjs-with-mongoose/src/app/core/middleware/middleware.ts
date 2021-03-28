import { Injectable, NestMiddleware, HttpStatus, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';
import { Logger } from '../../../logger/logger';
import AuthorizationService from '../../shared/services/authorization-service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private authorizationService: AuthorizationService, private logger: Logger) {

  }
  async use(req: Request, _: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException({ message: 'Token Not Provided, Token Authorization Failed' }, HttpStatus.UNAUTHORIZED);
    }
    try {
      const { data } = await this.authorizationService.authorizeRequest(authorization);
      this.logger.info(`${data.uid}${data.email}` );
      if (data.email && data.uid) {
        req['user'] = data;
        next();
      } else {
        throw new HttpException({ message: 'Token Authorization Failed' }, HttpStatus.UNAUTHORIZED);
      }
    } catch (err) {
      throw new HttpException({ message: 'Token Authorization Failed' }, HttpStatus.UNAUTHORIZED);
    }
  }
}
