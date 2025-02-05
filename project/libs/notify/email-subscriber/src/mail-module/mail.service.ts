import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Post, Subscriber } from '@project/shared-core';
import { NotifyConfig } from '@project/notify-config';

import { EmailConfig } from './mail.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>;

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: EmailConfig.AddSubscriber.subject,
      template: EmailConfig.AddSubscriber.template,
      context: {
        user: `${subscriber.name} ${subscriber.name}`,
        email: `${subscriber.email}`,
      },
    });
  }

  public async sendNotifyPostUpdates(
    subscribers: Subscriber[],
    posts: Post[]
  ): Promise<void> {
    const htmlTable = posts.map(
      (post) =>
        `<tr>
            <td>${post.id}</td>
            <td>${post.authorId}</td>
            <td>${post.publicationDate}</td>
            <td>${post.postType}</td>
             <td>${post.name || post.quoteText || post.description}</td>
          </tr>`
    );

    const postsHtml = `<h2>Information about new posts</h2>
      <table style="width:100%" border="1">
        <tr>
          <th>Post ID</th>
             <th>Author Id</th>
                    <th>Publication</th>
          <th>Type</th>
          <th>Info</th>
        </tr>
        ${htmlTable}
      </table>`;
    for (const subscriber of subscribers) {
      await this.mailerService.sendMail({
        from: this.notifyConfig.mail.from,
        to: subscriber.email,
        subject: EmailConfig.PostUpdates.subject,
        template: EmailConfig.PostUpdates.template,
        html: postsHtml,
      });
    }
  }
}
