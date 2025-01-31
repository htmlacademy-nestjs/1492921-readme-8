import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { PostState, PostType } from '@project/shared-types';
import { BlogPostProperty } from '../swagger/blog-post-property';
export class BlogPostRdo {
  @ApiProperty(BlogPostProperty.Id.Description)
  @Expose()
  public id: string;

  @ApiProperty(BlogPostProperty.PostType.Description)
  @Expose()
  public postType: PostType;

  @ApiProperty(BlogPostProperty.AuthorId.Description)
  @Expose()
  public authorId: string;

  @ApiProperty(BlogPostProperty.IsRepost.Description)
  @Expose()
  public isRepost: boolean;

  @ApiProperty(BlogPostProperty.RepostId.Description)
  @Expose()
  public repostId: string;

  @ApiProperty(BlogPostProperty.RepostAuthorId.Description)
  @Expose()
  public repostAuthorId: string;

  @ApiProperty(BlogPostProperty.Tags.Description)
  @Expose()
  public tags: string[];

  @ApiProperty(BlogPostProperty.CreateDate.Description)
  @Expose()
  public createDate: Date;

  @ApiProperty(BlogPostProperty.State.Description)
  @Expose()
  public state: PostState;

  @ApiProperty(BlogPostProperty.PublicationDate.Description)
  @Expose()
  public publicationDate: Date;

  @ApiProperty(BlogPostProperty.LikesCount.Description)
  @Expose()
  public likesCount: number;

  @ApiProperty(BlogPostProperty.CommentsCount.Description)
  @Expose()
  public commentsCount: number;

  @ApiProperty(BlogPostProperty.Name.Description)
  @Expose()
  public name: string;

  @ApiProperty(BlogPostProperty.Url.Description)
  @Expose()
  public url: string;

  @ApiProperty(BlogPostProperty.Preview.Description)
  @Expose()
  public preview: string;

  @ApiProperty(BlogPostProperty.Text.Description)
  @Expose()
  public text: string;

  @ApiProperty(BlogPostProperty.QuoteText.Description)
  @Expose()
  public quoteText: string;

  @ApiProperty(BlogPostProperty.QuoteAuthor.Description)
  @Expose()
  public quoteAuthor: string;

  @ApiProperty(BlogPostProperty.Description.Description)
  @Expose()
  public description: string;

  @ApiProperty(BlogPostProperty.Comments.Description)
  @Expose()
  public comments: Comment[];
}
