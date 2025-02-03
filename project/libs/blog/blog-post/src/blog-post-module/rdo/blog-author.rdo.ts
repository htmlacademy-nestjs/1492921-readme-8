import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BlogAuthorRdo {
  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public avatarUrl: string;
}
