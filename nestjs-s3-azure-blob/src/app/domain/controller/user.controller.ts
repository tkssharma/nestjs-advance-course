import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import CreateUserDto from '../dto/user.dto';

@Controller('/api/v1/users')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class AuthenticationController {

  @Post('/')
  public async createUser() {
    return 'Hello';
  }
}
