import { Module } from '@nestjs/common';

import { BlogPostModule } from '@project/blog-post';

import { BlogLikeFactory } from './blog-like.factory';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeController } from './blog-like.controller';

@Module({
  imports: [BlogPostModule],
  controllers: [BlogLikeController],
  providers: [BlogLikeService, BlogLikeFactory, BlogLikeRepository],
  exports: [BlogLikeService],
})
export class BlogLikeModule {}
