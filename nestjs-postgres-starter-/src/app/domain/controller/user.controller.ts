import { Body, Req, Controller, HttpCode, Post, UseGuards, Get, ValidationPipe, UsePipes, UseInterceptors, Query } from '@nestjs/common';
import { LoggerInterceptor } from '../../logger.interceptor';
import { CreatePostDto, SearchPostDto } from '../dto/post.dto';
import PostService from '../services/post.service';

@Controller('/api/v1')
@UseInterceptors(new LoggerInterceptor())

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}
  @Post('post')
  public async createPost(@Body() post: CreatePostDto) {
    return await this.postService.create(post);
  }
 // /:id 
 // post/search?tag=nodejs
  @Get('post/search')
  public async searchPost(@Query() queryParams: SearchPostDto) {
    return await this.postService.search(queryParams);
  }
}