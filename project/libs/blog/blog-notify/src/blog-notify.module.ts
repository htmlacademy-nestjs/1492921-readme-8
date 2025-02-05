import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

import { getRabbitMQOptions } from '@project/shared-helpers';

import { BlogNotifyService } from './blog-notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit-blog')
    ),
  ],
  providers: [BlogNotifyService],
  exports: [BlogNotifyService],
})
export class BlogNotifyModule {}
