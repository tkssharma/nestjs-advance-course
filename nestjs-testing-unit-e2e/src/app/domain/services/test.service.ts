import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from '../dto/user.dto';
import User from '../entities/user';
const bcrypt = require('bcrypt');

@Injectable()
export default class TestService {
  private readonly logger = new Logger(TestService.name);
  constructor() { }
  public sayHi(email: string) {
     return email
  }
}