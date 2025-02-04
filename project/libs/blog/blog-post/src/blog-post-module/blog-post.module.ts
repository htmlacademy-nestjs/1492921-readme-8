import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';
import { BlogNotifyModule } from '@project/blog-notify';

import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostFactory } from './blog-post.factory';

@Module({
  imports: [PrismaClientModule, BlogNotifyModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService],
})
export class BlogPostModule {}
