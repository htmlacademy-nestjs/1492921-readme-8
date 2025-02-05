import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';
import { BlogPostModule } from '@project/blog-post';

import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentFactory } from './blog-comment.factory';

@Module({
  imports: [PrismaClientModule, BlogPostModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository, BlogCommentFactory],
  exports: [BlogCommentService],
})
export class BlogCommentModule {}
