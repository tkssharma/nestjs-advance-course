import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, UnauthorizedException } from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { FirebaseAuthService } from '../services/firebase.service';
import * as CONSTANT from '../constants.api';
import { UserDTO } from '../dto/user.dto';
import * as admin from 'firebase-admin'

@ApiTags('User')
@Controller('/api/v1')
export class UserController {

  constructor(private authService: FirebaseAuthService) { }

  @Post('user')
  @ApiOkResponse({ schema: { example: { isAuthenticate: true, status: 200 } } })
  public async createUser(@Req() req: Request, @Body() userDto: UserDTO): Promise<any> {
     
    const { displayName, password, email, role } = userDto;

    try {
      const {uid} = await admin.auth().createUser({
        displayName,
        password,
        email
      });
      await admin.auth().setCustomUserClaims(uid, {role});
      return {uid};
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
