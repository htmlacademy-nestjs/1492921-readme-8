import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { Post } from '@project/shared-core';
import { BlogPostError } from '@project/blog-post';

import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class CheckMyPostGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Проверка авторизации
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/check`,
      {},
      {
        headers: {
          Authorization: request.headers['authorization'],
        },
      }
    );

    const userId = data['sub'];
    // Проверка на совпадение автора поста и авторизованного пользователя
    const { data: post } = await this.httpService.axiosRef.get<Post>(
      `${ApplicationServiceURL.Blogs}/${request.params.postId}`
    );

    if (post.authorId !== userId) {
      throw new ForbiddenException(BlogPostError.NotAllow);
    }
    request['user'] = data;
    return true;
  }
}
