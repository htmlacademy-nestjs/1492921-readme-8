import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public postId: string;

  @Expose()
  public userId: string;

  @Expose()
  public text: string;

  @Expose()
  public createDate: Date;
}
