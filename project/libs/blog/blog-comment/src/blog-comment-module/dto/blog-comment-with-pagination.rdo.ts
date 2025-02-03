import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CommonProperty } from '@project/shared-core';

import { BlogCommentProperty } from '../swagger/blog-comment-property';
import { BlogCommentRdo } from '../rdo/blog-comment.rdo';


export class BlogCommentWithPaginationRdo {
  @ApiProperty(BlogCommentProperty.CommentList.Description)
  @Type(() => BlogCommentRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: BlogCommentRdo[];

  @ApiProperty(CommonProperty.TotalPages.Description)
  @Expose()
  public totalPages: number;

  @ApiProperty(CommonProperty.TotalItems.Description)
  @Expose()
  public totalItems: number;

  @ApiProperty(CommonProperty.CurrentPage.Description)
  @Expose()
  public currentPage: number;

  @ApiProperty(CommonProperty.ItemsPerPage.Description)
  @Expose()
  public itemsPerPage: number;
}
