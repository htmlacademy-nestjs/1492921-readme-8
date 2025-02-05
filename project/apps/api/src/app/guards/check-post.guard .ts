import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class CheckPostGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blogs}/${request.params.postId}`
    );

    if (data) {
      return true;
    }
    return false;
  }
}
