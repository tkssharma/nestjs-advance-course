import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from '../dto/user.dto';
import User from '../entities/user';
import TestService from './test.service';
const bcrypt = require('bcrypt');

@Injectable()
export default class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly testService: TestService) { }

  public sayHello(email: string) {
    return this.testService.sayHi(email);
  }
  public async getAllUsers() {
    const users: User[] = await this.userRepo.find();
    return users.map((user: any) => {
        delete user.password;
        return user;
    }) ;
  }
  public async getByEmail(email: string) {
    this.logger.log('getting user by email');
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  public async getById(id: string) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  public async register(registrationData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userRepo.create({
        ...registrationData,
        password: hashedPassword,
      });
      const user = await this.userRepo.save(createdUser)
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
