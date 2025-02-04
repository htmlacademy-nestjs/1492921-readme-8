import { Expose } from 'class-transformer';

import { PostType } from '@project/shared-core';

export class BlogNotifyDto {
  @Expose()
  public id: string;
  @Expose()
  public authorId: string;
  @Expose()
  public postType: PostType;
  @Expose()
  public publicationDate: Date;
  @Expose()
  public name: string;
  @Expose()
  public quoteText: string;
  @Expose()
  public description: string;
}
