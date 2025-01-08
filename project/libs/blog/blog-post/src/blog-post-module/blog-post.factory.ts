import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

//import { Post, EntityFactory, PostState } from '@project/shared-types';
import { Post, EntityFactory } from '@project/shared-types';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.postType = dto.postType;
    entity.authorId = dto.authorId;
    //entity.isRepost = dto.repostId ? true : false;
    entity.repostId = dto.repostId;
    //entity.repostAuthorId = dto.repostAuthorId;
    entity.tags = dto.tags ?? []; //(dto.tags ?? []).map((tag) => ({ name: tag }));
    //entity.state = PostState.Published;
    entity.createDate = dayjs().toDate();
    entity.publicationDate = dayjs().toDate();
    entity.likesCount = 0;
    entity.commentsCount = 0;
    entity.name = dto.name;
    entity.url = dto.url;
    entity.preview = dto.preview;
    entity.text = dto.text;
    entity.quoteText = dto.quoteText;
    entity.quoteAuthor = dto.quoteAuthor;
    entity.description = dto.description;
    entity.comments = [];

    return entity;
  }
}
