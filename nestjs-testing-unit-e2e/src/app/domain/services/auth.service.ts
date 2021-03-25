import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor() { }
  public validate(token: string) {
     return true;
  }
}