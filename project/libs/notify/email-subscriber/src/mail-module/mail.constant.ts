export const EmailConfig = {
  AddSubscriber: {
    template: './add-subscriber',
    subject: 'Подписка на рассылку оформлена',
  },
  PostUpdates: {
    template: './post-updates',
    subject: 'Список новых/обновленных постов',
  },
} as const;
