import { Injectable } from '@nestjs/common';

import { Comment, EntityFactory } from '@project/shared-types';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentFactory implements EntityFactory<BlogCommentEntity> {
  public create(entityPlainData: Comment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData);
  }

  public createFromDto(
    dto: CreateCommentDto,
    postId: string
  ): BlogCommentEntity {
    return new BlogCommentEntity({
      ...dto,
      postId,
    });
  }
}
