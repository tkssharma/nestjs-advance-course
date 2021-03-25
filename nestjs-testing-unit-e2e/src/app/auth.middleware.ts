import { createParamDecorator, ExecutionContext, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';
import AuthService from './domain/services/auth.service';
// tslint:disable:naming-convention
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authorizationService: AuthService) {}

  public async use(req: Request, res_: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new HttpException({ message: 'missing token' }, HttpStatus.BAD_REQUEST);
    }
    if (this.authorizationService.validate(authorization)){
      console.log('??')
      next();
    } else {
    throw new HttpException({ message: 'invalid token' }, HttpStatus.UNAUTHORIZED);
    }
  }
}