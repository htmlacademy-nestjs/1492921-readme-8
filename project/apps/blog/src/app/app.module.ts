import { Module } from '@nestjs/common';

import { BlogPostModule } from '@project/blog-post';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogLikeModule } from '@project/blog-like';
import { BlogNotifyModule } from '@project/blog-notify';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [
    BlogPostModule,
    BlogCommentModule,
    BlogLikeModule,
    BlogNotifyModule,
    BlogConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
