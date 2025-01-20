import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Like, PostState } from '@project/shared-types';
import { BlogPostService } from '@project/blog-post';

import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeResponseMessage } from './blog-like.constant';

@Injectable()
export class BlogLikeService {
  constructor(
    private readonly blogLikeRepository: BlogLikeRepository,
    private readonly blogPostService: BlogPostService
  ) {}

  public async addLike(like: Like): Promise<void> {
    const isLikeExists = await this.blogLikeRepository.isLikeExists(like);
    if (isLikeExists) {
      throw new ConflictException(BlogLikeResponseMessage.LikeExists);
    }
    const post = await this.blogPostService.getPost(like.postId);
    if (!post) {
      throw new NotFoundException(BlogLikeResponseMessage.PostNotFound);
    }
    if (post.state === PostState.Draft) {
      throw new ForbiddenException(BlogLikeResponseMessage.PostIsDraft);
    }
    const newLike = new BlogLikeEntity(like);
    await this.blogLikeRepository.save(newLike);
  }

  public async delLike(like: Like): Promise<void> {
    const isLikeExists = await this.blogLikeRepository.isLikeExists(like);
    if (!isLikeExists) {
      throw new ConflictException(BlogLikeResponseMessage.LikeNotFound);
    }
    await this.blogLikeRepository.deleteByIds(like);
  }
}
