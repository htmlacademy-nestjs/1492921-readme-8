import { Module } from '@nestjs/common';

import { BlogPostModule } from '@project/blog-post';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogLikeModule } from '@project/blog-like';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BlogPostModule, BlogCommentModule, BlogLikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
