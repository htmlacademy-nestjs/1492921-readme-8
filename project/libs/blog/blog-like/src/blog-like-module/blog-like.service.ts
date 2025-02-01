import { ConflictException, Injectable } from '@nestjs/common';

import { Like } from '@project/shared-core';

import { BlogLikeEntity } from './blog-like.entity';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeResponseMessage } from './blog-like.constant';

@Injectable()
export class BlogLikeService {
  constructor(private readonly blogLikeRepository: BlogLikeRepository) {}

  public async addLike(like: Like): Promise<void> {
    const isLikeExists = await this.blogLikeRepository.isLikeExists(like);
    if (isLikeExists) {
      throw new ConflictException(BlogLikeResponseMessage.LikeExists);
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
