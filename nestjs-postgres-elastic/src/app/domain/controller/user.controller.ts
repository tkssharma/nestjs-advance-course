import { Body,
  CacheInterceptor, Controller, Post, Get, ValidationPipe, UsePipes, UseInterceptors, Query, Delete, Param } from '@nestjs/common';
import { LoggerInterceptor } from '../../logger.interceptor';
import { CreatePostDto, SearchElasticDto, SearchParamsDto, SearchPostDto } from '../dto/post.dto';
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
    private readonly postService: PostService
  ) {}
  @Post('post')
  public async createPost(@Body() post: CreatePostDto) {
    return await this.postService.create(post);
  }
  @Delete('post/:id')
  public async deletePost(@Param() params: SearchParamsDto) {
    return await this.postService.deletePost(params.id);
  }
  @Get('post/search')
  // post/search?search_term=hello
  // post/search?search_term=hello1

  @UseInterceptors(CacheInterceptor)
  public async searchPost(@Query() queryParams: SearchPostDto) {
    return await this.postService.search(queryParams);
  }
  @UseInterceptors(CacheInterceptor)
  @Get('post/elastic-search')
  public async searchElastic(@Query() queryParams: SearchElasticDto) {
    return await this.postService.searchElastic(queryParams);
  }
}