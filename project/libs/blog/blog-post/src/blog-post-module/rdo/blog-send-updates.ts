import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BlogPostProperty } from '../swagger/blog-post-property';

export class BlogSendUpdatesRdo {
  @ApiProperty(BlogPostProperty.SendingCount.Description)
  @Expose()
  public count: string;
}
