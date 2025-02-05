import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { Post, RabbitRouting } from '@project/shared-core';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller()
export class EmailSubscriberController {
  constructor(private readonly subscriberService: EmailSubscriberService) {}

  @RabbitSubscribe({
    exchange: process.env.RABBIT_EXCHANGE,
    routingKey: RabbitRouting.AddSubscriber,
    queue: process.env.RABBIT_QUEUE_SUBSCRIBERS,
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: process.env.RABBIT_EXCHANGE,
    routingKey: RabbitRouting.SendPostUpdates,
    queue: process.env.RABBIT_QUEUE_POST_UPDATES,
  })
  public async sendPostUpdates(posts: Post[]): Promise<void> {
    await this.subscriberService.sendNotifyPostUpdates(posts);
  }
}
