import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

export const BlogPostBody = {
  create: {
    type: CreatePostDto,
    examples: {
      v: {
        summary: 'postType = "video"',
        value: {
          postType: 'video',
          authorId: '6766fdb720f78014bf83d5a3',
          tags: ['Ford'],
          name: 'Первый пост не менее 20 символов',
          url: 'https://www.youtube.com/watch?v=Cvp41PCQKOs',
        },
      },
      t: {
        summary: 'postType = "text"',
        value: {
          postType: 'text',
          authorId: '6766fdb720f78014bf83d5a3',
          name: 'Первый пост не менее 20 символов',
          preview: 'Превью текста должно быть длинным около 50 символов',
          text: 'Текст поста нужно чтобы был аж 100 символов Текст поста нужно чтобы был аж 100 символов Текст поста нужно чтобы был аж 100 символов',
        },
      },
      q: {
        summary: 'postType = "quote"',
        value: {
          postType: 'text',
          authorId: '6766fdb720f78014bf83d5a3',
          quoteText:
            'Кто хочет, тот ищет возможности, кто не хочет — ищет причины.',
          quoteAuthor: 'Сократ',
        },
      },
      p: {
        summary: 'postType = "photo"',
        value: {
          postType: 'photo',
          authorId: '6766fdb720f78014bf83d5a3',
          tags: ['Ford', 'Retro'],
          url: '/images/photo.jpeg',
        },
      },
      l: {
        summary: 'postType = "link"',
        value: {
          postType: 'link',
          authorId: '6766fdb720f78014bf83d5a3',
          url: 'https://up.htmlacademy.ru/profession/fullstack/8/nodejs-2/8',
          description: 'Node.js и Nest.js. Микросервисная архитектура',
        },
      },
    },
  },
  update: {
    type: UpdatePostDto,
    examples: {
      v: {
        summary: 'state = "draft"',
        value: {
          postType: 'video',
          publicationDate: null,
        },
      },
      t: {
        summary: 'add tags"',
        value: {
          postType: 'photo',
          tags: ['tagq', 'tag2', 'tag3'],
        },
      },
    },
  },
} as const;
