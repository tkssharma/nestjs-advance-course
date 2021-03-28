import { Controller, Get, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('/api/v1/test')
export class TestController {
  constructor(
  ) { }

  @ApiTags('test')
  @Get('/filter')
  public test() {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'access to this res is forbidden',
    }, 403);
  }

  @ApiTags('test')
  @UseFilters( new HttpExceptionFilter())
  @Get('/filter-test')
  public test1() {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'access to this res is forbidden',
    }, 403);
  }
}
