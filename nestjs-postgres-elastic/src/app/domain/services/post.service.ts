import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchService } from '../../search/search.service';
import { CreatePostDto, SearchElasticDto, SearchPostDto } from '../dto/post.dto';
import Post from '../entities/post';
export interface IPagination {
  page: number;
  limit: number;
}

@Injectable()
export default class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private readonly searchService: SearchService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private eventEmitter: EventEmitter2,
  ) { }
  public async getByEmail(title: string) {
    this.logger.log('getting post by title');
    const post = await this.postRepo.findOne({ title });
    if (!post) {
      throw new HttpException('Post with this title does not exist', HttpStatus.NOT_FOUND);
    }
    return post;
  }
  public async getById(id: string) {
    const post = await this.postRepo.findOne(id);
    if (!post) {
      throw new HttpException('Post with this id does not exist', HttpStatus.NOT_FOUND);
    }

    return post;
  }
  public async getByTitle(title: string) {
    return await this.postRepo.findOne({ where: { title } });
  }
  public async create(postDto: CreatePostDto) {
    const post = await this.getByTitle(postDto.title);
    if (post) {
      throw new HttpException('Post with this title already exist', HttpStatus.CONFLICT);
    }
    const newPost = await this.postRepo.create(postDto);
    const postData = await this.postRepo.save(newPost);
    await this.searchService.indexPost(postData);
    this.eventEmitter.emit('user.created', {});
    return postData;
  }
  public extractTags(searchParam: SearchPostDto) {
    const tags = [];
    if (searchParam.tags) {
      if (Array.isArray(searchParam.tags)) {
        for (const tag of searchParam.tags) {
          tags.push(tag);
        }
      } else {
        tags.push(searchParam.tags);
      }
    }
    return tags;
  }
  @OnEvent('user.created')
  handleOrderCreatedEvent(payload: any) {
    // handle and process "OrderCreatedEvent" event
  }
  // tslint:disable-next-line:cognitive-complexity
  // tslint:disable-next-line:mccabe-complexity
  // tslint:disable-next-line:cyclomatic-complexity
  private async searchPosts(params: SearchPostDto): Promise<any> {
    const pagination: IPagination = {
      page: Number(params.page || 1),
      limit: Number(params.limit || 15),
    };
    const skippedItems = (pagination.page - 1) * pagination.limit;
    const tagExtract = this.extractTags(params);
    const { search_term, tags, startId } = params;
    let query = `
    select
    count(*) OVER() as count,
    tags,
    id, title, email from post,
    jsonb_to_recordset(post.tags) as tagItem(tag text)
    `;
    if (
      search_term ||
      this.extractTags.length > 0
    ) {
      query = `${query} where id is not NULL`;
    }
    if (search_term) {
      const queryString = `(
        title ILIKE '%${search_term}%' OR
        url ILIKE '%${search_term}%' OR
        text ILIKE '%${search_term}%' OR
        email ILIKE '%${search_term}%')`;
      query = `${query} AND (${queryString})`;
    }
    if (tagExtract && tagExtract.length > 0) {
      let queryString = '';
      for (const tag of tagExtract) {
        if (!queryString) {
          queryString = `${queryString} tagItem.tag ILIKE '%${tag}%'`;
        } else {
          queryString = `${queryString} OR tagItem.tag ILIKE '%${tag}%'`;
        }
      }
      query = `${query} AND (${queryString})`;
    }
    const queryBuilder = `${query} GROUP BY id ORDER BY title ASC LIMIT ${pagination.limit} OFFSET ${skippedItems}`;
    const posts = await this.postRepo.query(queryBuilder);
    const count = parseInt(posts[0] && posts[0].count || 0, 10);
    return {
      posts,
      totalCount: count,
    };
  }
  public async searchElastic(param: SearchElasticDto) {
    return this.searchService.search(param.search_term);
  }
  public async deletePost(id: any) {
    const post = await this.getById(id);
    await this.postRepo.delete(id);
    await this.searchService.remove(id);
    return null;
  }
  public async search(params: SearchPostDto) {
    try {
      const { page, limit } = params;
      const pagination = {
        page: page || 1,
        limit: limit || 10,
      };
      const { totalCount, posts } = await this.searchPosts(params);
      return {
        totalCount,
        page: pagination.page,
        limit: pagination.limit,
        data: posts.length > 0 ? posts : [],
      };
    } catch (err) {
      throw err;
    }
  }
}
