import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

import { PostType } from '@prisma/client';
import { CommonProperty, SortDirection, SortType } from '@project/shared-core';

import {
  BlogPostPaginationDefault,
  BlogPostSortDefault,
} from './blog-post.constant';
import { BlogPostProperty } from './swagger/blog-post-property';

export class BlogPostQuery {
  public limit: number = BlogPostPaginationDefault.PostCountLimit;

  @ApiProperty(BlogPostProperty.SortDirection.Description)
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirection = BlogPostSortDefault.Direction;

  @ApiProperty(BlogPostProperty.SortType.Description)
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortBy?: SortType = BlogPostSortDefault.Type;

  @ApiProperty(CommonProperty.CurrentPage.Description)
  @Transform(
    ({ value }) => parseInt(value, 10) || BlogPostPaginationDefault.PageCurrent
  )
  @IsOptional()
  public page?: number = BlogPostPaginationDefault.PageCurrent;

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

  @ApiProperty(CommonProperty.UserId.Description)
  @IsMongoId()
  @IsOptional()
  userId?: string;
}

export class BlogPostSearchQuery {
  public limit: number = BlogPostPaginationDefault.PostCountSearch;

  @ApiProperty(BlogPostProperty.Search.Description)
  @IsString()
  public name: string;
}

export class BlogPostCountQuery {
  @ApiProperty(CommonProperty.UserIdNotNull.Description)
  @IsMongoId()
  public userId: string;
}
