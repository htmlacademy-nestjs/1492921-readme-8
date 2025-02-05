import { Injectable } from '@nestjs/common';

import { Post } from '@project/shared-core';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { MailService } from './mail-module/mail.service';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
    private readonly mailService: MailService
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber =
      await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      return;
    }

    const emailSubscriber = new EmailSubscriberEntity(subscriber);

    await this.emailSubscriberRepository.save(emailSubscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  public async sendNotifyPostUpdates(posts: Post[]): Promise<void> {
    const subscribers = await this.emailSubscriberRepository.findAll();

    if (!subscribers.length) {
      return;
    }

    await this.mailService.sendNotifyPostUpdates(subscribers, posts);
  }
}
