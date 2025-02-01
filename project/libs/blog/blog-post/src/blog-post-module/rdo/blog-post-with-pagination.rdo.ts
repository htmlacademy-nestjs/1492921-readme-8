import { Expose, Type } from 'class-transformer';
import { BlogPostRdo } from './blog-post.rdo';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostProperty } from '../swagger/blog-post-property';

export class BlogPostWithPaginationRdo {
  @ApiProperty(BlogPostProperty.PostList.Description)
  @Type(() => BlogPostRdo)
  @ValidateNested({ always: true })
  @Expose()
  public entities: BlogPostRdo[];

  @ApiProperty(BlogPostProperty.TotalPages.Description)
  @Expose()
  public totalPages: number;

  @ApiProperty(BlogPostProperty.TotalItems.Description)
  @Expose()
  public totalItems: number;

  @ApiProperty(BlogPostProperty.CurrentPage.Description)
  @Expose()
  public currentPage: number;

  @ApiProperty(BlogPostProperty.ItemsPerPage.Description)
  @Expose()
  public itemsPerPage: number;
}
