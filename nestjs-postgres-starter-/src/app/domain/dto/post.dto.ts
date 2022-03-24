import { ApiProperty } from '@nestjs/swagger';
import { Type, Type as ValidateType } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsNumber, IsOptional, IsString, Min, MinLength, ValidateNested } from 'class-validator';
/*
SELECT * FROM post
WHERE id > 20
ORDER BY id ASC
LIMIT 10
*/

export class PostTag {
  @ApiProperty({description: 'post tag name', required: true})
  @IsOptional()
  @IsString()
  public tag?: string;
}
export class CreatePostDto {
  @ApiProperty({description: 'TITLE', required: true})
  @IsString()
  @MinLength(4)
  public title!: string;

  @ApiProperty({description: 'EMAIL', required: true})
  @IsEmail()
  @MinLength(4)
  public email!: string;

  @ApiProperty({description: 'url', required: true})
   @IsString()
  @MinLength(4)
  public url!: string;

 @ApiProperty({description: 'tags', required: false, type:[PostTag]})
 @IsOptional()
 @IsArray()
 @ValidateNested()
 @ArrayMinSize(1)
 @ValidateType(() => PostTag)
 public tags?: PostTag [];
}

export class SearchPostDto {
  @ApiProperty({description: 'search_term', required: false})
  @IsOptional()
  @IsString()
  @MinLength(2)
  public search_term!: string;

  @ApiProperty({
    description: 'tags',
    required: false,
  })
  @IsString({ each: true })
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'page number for request',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public page?: number;

  @ApiProperty({
    description: 'number of records in a request',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public limit?: number;

  @ApiProperty({
    description: 'number of records in a request',
    required: true,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  startId?: number;

}