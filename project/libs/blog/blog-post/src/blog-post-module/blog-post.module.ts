import { Module } from '@nestjs/common';

import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
//import { BlogPostRepository } from './blog-post.repository';
//import { BlogPostFactory } from './blog-post.factory';

@Module({
  //imports: [BlogPostModule],
  controllers: [BlogPostController],
  providers: [BlogPostService], //, BlogPostRepository, BlogPostFactory],
  //exports: [BlogPostRepository],
})
export class BlogPostModule {}
