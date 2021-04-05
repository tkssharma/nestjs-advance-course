import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService, private readonly configService: ConfigService) { }
  // tslint:disable-next-line:no-big-function
  public async createIndex() {
    const index = this.configService.get('ELASTICSEARCH_INDEX');
    const checkIndex = await this.esService.indices.exists({ index });
    // tslint:disable-next-line:early-exit
    if (checkIndex.statusCode === 404) {
      this.esService.indices.create(
        {
          index,
          body: {
            mappings: {
              properties: {
                email: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                tags: {
                  properties: {
                    tag: {
                      type: 'text',
                      fields: {
                        keyword: {
                          type: 'keyword',
                          ignore_above: 256,
                        },
                      },
                    },
                  },
                },
                text: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
                title: {
                  type: 'text',
                  fields: {
                    keyword: {
                      type: 'keyword',
                      ignore_above: 256,
                    },
                  },
                },
              },
            },
            settings: {
              analysis: {
                filter: {
                  autocomplete_filter: {
                    type: 'edge_ngram',
                    min_gram: 1,
                    max_gram: 20,
                  },
                },
                analyzer: {
                  autocomplete: {
                    type: 'custom',
                    tokenizer: 'standard',
                    filter: ['lowercase', 'autocomplete_filter'],
                  },
                },
              },
            },
          },
        },
        (err: any) => {
          if (err) {
            console.log(err);
          }
        },
      );
    }
  }
  public async indexPost(post: any) {
    return await this.esService.index({
      index: this.configService.get('ELASTICSEARCH_INDEX')!,
      body: post,
    });
  }
  public async remove(postId: number) {
    this.esService.deleteByQuery({
      index: this.configService.get('ELASTICSEARCH_INDEX')!,
      body: {
        query: {
          match: {
            id: postId,
          }
        },
      },
    });
  }
}
