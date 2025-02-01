import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PostType } from '@project/shared-types';
import { BlogPostProperty } from '../swagger/blog-post-property';

export class TaPostDto {
  @ApiProperty(BlogPostProperty.PostType.Description)
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty(BlogPostProperty.Tags.Description)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
