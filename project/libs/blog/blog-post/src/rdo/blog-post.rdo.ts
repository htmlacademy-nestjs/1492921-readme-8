import { PostState, PostType } from '@project/shared-types';
import { Expose, Type } from 'class-transformer';
import { BlogAuthorRdo } from './blog-author.rdo';

export class BlogPostRdo {
  @Expose()
  public id: string;
  @Expose()
  public postType: PostType;
  @Expose()
  public authorId: string;
  @Expose()
  public isRepost: boolean;
  @Expose()
  public repostId: string;
  @Expose()
  @Type(() => BlogAuthorRdo)
  public repostAuthor: BlogAuthorRdo;
  @Expose()
  public tags: string[];
  @Expose()
  public state: PostState;
  @Expose()
  public createDate: Date;
  @Expose()
  public publicationDate: Date;
  @Expose()
  public likesCount: number;
  @Expose()
  public commentsCount: number;
  @Expose()
  public name: string;
  @Expose()
  public url: string;
  @Expose()
  public preview: string;
  @Expose()
  public text: string;
  @Expose()
  @Type(() => BlogAuthorRdo)
  public quoteAuthor: BlogAuthorRdo;
  @Expose()
  public quoteText: string;
  @Expose()
  public description: string;
}
