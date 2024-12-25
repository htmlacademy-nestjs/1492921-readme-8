import { Expose } from 'class-transformer';

export class BlogAuthorRdo {
  @Expose()
  public name: string;

  @Expose()
  public avatarUrl: string;
}
