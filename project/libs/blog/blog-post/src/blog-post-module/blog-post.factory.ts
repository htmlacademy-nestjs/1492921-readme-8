import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { Post, EntityFactory } from '@project/shared-types';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createNewPost(dto: CreatePostDto): BlogPostEntity {
    const newPost = new BlogPostEntity();
    newPost.postType = dto.postType;
    newPost.authorId = dto.authorId;
    newPost.tags = dto.tags ?? [];
    newPost.createDate = dayjs().toDate();
    newPost.publicationDate = dayjs().toDate();
    newPost.likesCount = 0;
    newPost.commentsCount = 0;
    newPost.name = dto.name;
    newPost.url = dto.url;
    newPost.preview = dto.preview;
    newPost.text = dto.text;
    newPost.quoteText = dto.quoteText;
    newPost.quoteAuthor = dto.quoteAuthor;
    newPost.description = dto.description;

    return newPost;
  }

  public static createRepost(
    originalPost: Post,
    userId: string
  ): BlogPostEntity {
    const newPost = new BlogPostEntity(originalPost);

    newPost.authorId = userId;
    newPost.repostId = originalPost.id;
    newPost.createDate = dayjs().toDate();
    newPost.publicationDate = dayjs().toDate();
    newPost.likesCount = 0;
    newPost.commentsCount = 0;

    return newPost;
  }
}
