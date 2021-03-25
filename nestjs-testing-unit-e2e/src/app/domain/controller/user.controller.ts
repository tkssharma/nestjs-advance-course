import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import CreateUserDto, { UserParam } from '../dto/user.dto';
import UserService from '../services/user.service';
 
@Controller('/api/v1/users')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class AuthenticationController {
  constructor(
    private readonly userSvc: UserService,
  ) {}
  @Post('/')
  public async createUser(@Body() registrationData: CreateUserDto) {
    return this.userSvc.register(registrationData);
  }
  @Get('/:id')
  public async getUser(@Param() params: UserParam) {
    return await this.userSvc.getById(params.id);
  }
  @Get('/')
  public async getAllUser() {
    return await this.userSvc.getAllUsers();
  }
}
