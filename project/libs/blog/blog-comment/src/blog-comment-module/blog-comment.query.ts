import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { BlogCommentPaginationDefault } from './blog-comment.constant';
import { CommonProperty } from '@project/shared-core';

export class BlogCommentQuery {
  public limit: number = BlogCommentPaginationDefault.PostCountLimit;

  @ApiProperty(CommonProperty.CurrentPage.Description)
  @Transform(({ value }) => parseInt(value, 10) || BlogCommentPaginationDefault.PageCurrent)
  @IsOptional()
  public page: number = BlogCommentPaginationDefault.PageCurrent
}
