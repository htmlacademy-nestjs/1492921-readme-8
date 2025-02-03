import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { BlogPostProperty } from '@project/blog-post';
import { CommonProperty } from '@project/shared-core';

import { BlogCommentProperty } from '../swagger/blog-comment-property';

export class BlogCommentRdo {
  @ApiProperty(BlogCommentProperty.Id.Description)
  @Expose()
  public id: string;

  @ApiProperty(BlogPostProperty.Id.Description)
  @Expose()
  public postId: string;

  @ApiProperty(CommonProperty.UserId.Description)
  @Expose()
  public userId: string;

  @ApiProperty(BlogCommentProperty.Text.Description)
  @Expose()
  public text: string;

  @ApiProperty(CommonProperty.CreateDate.Description)
  @Expose()
  public createDate: Date;
}
