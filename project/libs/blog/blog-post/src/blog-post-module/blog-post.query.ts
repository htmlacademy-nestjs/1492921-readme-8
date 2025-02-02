import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@prisma/client';
import { SortDirection, SortType } from '@project/shared-core';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

import { PaginationDefault, SortDefault } from './blog-post.constant';
import { BlogPostProperty } from './swagger/blog-post-property';

export class BlogPostQuery {
  public limit: number = PaginationDefault.PostCountLimit;

  @ApiProperty(BlogPostProperty.SortDirection.Description)
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = SortDefault.Direction;

  @ApiProperty(BlogPostProperty.SortType.Description)
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortBy?: SortType = SortDefault.Type;

  @ApiProperty(BlogPostProperty.PageCurrent.Description)
  @Transform(
    ({ value }) => parseInt(value, 10) || PaginationDefault.PageCurrent
  )
  @IsOptional()
  public page: number = PaginationDefault.PageCurrent;

  @ApiProperty(BlogPostProperty.PostType.Description)
  @IsIn(Object.values(PostType))
  @IsOptional()
  postType?: PostType;

  @ApiProperty(BlogPostProperty.AuthorId.Description)
  @IsString()
  @IsMongoId()
  @IsOptional()
  authorId?: string;

  @ApiProperty(BlogPostProperty.Tags.Description)
  @Transform(({ value }) =>
    typeof value === 'string'
      ? [value.toLowerCase()]
      : value.map((tag) => tag.toLowerCase())
  )
  @IsArray()
  @IsOptional()
  public tags?: string[];

  @ApiProperty(BlogPostProperty.MyDraft.Description)
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsBoolean()
  @IsOptional()
  myDraft?: boolean = false;

  @ApiProperty(BlogPostProperty.UserId.Description)
  @IsString()
  @IsMongoId()
  @IsOptional()
  userId?: string;

  // @IsString()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'search',
  //   required: false,
  // })
  // public search?: string;
}
