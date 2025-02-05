import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BlogCommentProperty } from '../swagger/blog-comment-property';
import { CommonProperty } from '@project/shared-core';

export class CreateBlogCommentDto {
  @ApiProperty(BlogCommentProperty.Text.Description)
  @IsString()
  @IsNotEmpty()
  public text: string;

  @ApiProperty(CommonProperty.UserIdNotNull.Description)
  @IsString()
  @IsMongoId()
  public userId: string;
}
