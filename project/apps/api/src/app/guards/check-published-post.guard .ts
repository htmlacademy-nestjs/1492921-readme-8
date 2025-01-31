import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { Post, PostState } from '@project/shared-types';
import { BlogPostError } from '@project/blog-post';

import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class CheckPublishedPostGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.get<Post>(
      `${ApplicationServiceURL.Blogs}/${request.params.postId}`
    );

    if (data.state === PostState.Draft) {
      throw new ForbiddenException(BlogPostError.PostIsDraft);
    }
    return true;
  }
}
