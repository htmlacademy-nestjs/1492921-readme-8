export const BlogPostOperation = {
  Create: { summary: 'Добавление новой публикации' },
  Update: { summary: 'Редактирование публикации' },
  Delete: { summary: 'Удаление публикации' },
  Index: { summary: 'Получение списка публикаций' },
  View: { summary: 'Просмотр публикации' },
  Repost: { summary: 'Репост публикации' },
  Search: { summary: 'Поиск публикаций по названию' },
  MyPosts: { summary: 'Получения списка моих публикаций' },
  Count: { summary: 'Количество публикации пользователя' },
  MyFeed: { summary: 'Лента пользователя' },
} as const;
