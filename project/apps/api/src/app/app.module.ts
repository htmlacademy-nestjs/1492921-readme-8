import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HttpClientConfig } from './app.config';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogController } from './blog.controller';
import { FilesController } from './files.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClientConfig.Timeout,
      maxRedirects: HttpClientConfig.MaxRedirects,
    }),
  ],
  controllers: [UsersController, BlogController, FilesController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
