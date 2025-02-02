import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class InjectUserIdQueryInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService) {}

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    try {
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Users}/check`,
        {},
        {
          headers: {
            Authorization: request.headers['authorization'],
          },
        }
      );
      request.query['userId'] = data.sub;
    } catch (error) {
      return next.handle();
    }
    return next.handle();
  }
}
