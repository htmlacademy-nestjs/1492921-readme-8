import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { CommonProperty } from '@project/shared-core';

import { BlogPostRdo } from './blog-post.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostProperty } from '../swagger/blog-post-property';


export class BlogPostWithPaginationRdo {
  @ApiProperty(BlogPostProperty.PostList.Description)
  @Type(() => BlogPostRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: BlogPostRdo[];

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
