import { BadRequestException, Controller, Get, HttpStatus, Req, UnauthorizedException } from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { FirebaseAuthService } from '../services/firebase.service';
import * as CONSTANT from '../constants.api';

@ApiBearerAuth('access-token')
@ApiTags('Auth')
@Controller('/api/v1')
export class AuthController {

  constructor(private authService: FirebaseAuthService) { }

  @Get('authenticate')
  @ApiBadRequestResponse({ schema: { example: { statusCode: 400, message: CONSTANT.MISSING_AUTH_HEADER, error: 'Bad Request' } } })
  @ApiUnauthorizedResponse({ schema: { example: { statusCode: 401, message: CONSTANT.INVALID_AUTH_TOKEN, error: 'Unauthorized' } } })
  @ApiOkResponse({ schema: { example: { isAuthenticate: true, status: 200 } } })
  public async authenticate(@Req() req: Request): Promise<any> {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw new BadRequestException(CONSTANT.MISSING_AUTH_HEADER);
    }
    try {
      const {uid, email,role } = await this.authService.authenticate(authToken);
      return { uid, email, role,  status: HttpStatus.OK };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
