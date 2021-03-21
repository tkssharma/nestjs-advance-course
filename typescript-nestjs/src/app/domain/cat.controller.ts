import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCatDto, GetCatByIdParam } from './cat.dto';
import { CatsService } from './cat.service';

@Controller('cats')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class CatController {
  constructor(private readonly catService: CatsService){}

  @ApiTags('cat')
  @Post('')
  @ApiOperation({
     description: 'create new Cat' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'data has been created successfully' })
  async createCat(@Body() cat: CreateCatDto) {
    return this.catService.create(cat);
  }

  @ApiTags('cat')
  @Get('')
  @ApiOperation({
     description: 'Get All Cat' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'data has been fetched successfully' })
  async listAll() {
    return this.catService.findAll();
  }
}