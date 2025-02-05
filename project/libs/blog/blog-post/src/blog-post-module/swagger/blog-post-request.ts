import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

export const BlogPostBody = {
  createPhoto: {
    schema: {
      type: 'object',
      properties: {
        photoFile: {
          type: 'string',
          format: 'binary',
          description: 'The photo file to upload',
        },
        tags: {
          type: 'string',
          description: 'Comma-separated list of post tags',
          example: 'tag-1, tag-2',
        },
      },
    },
  },
  create: {
    type: CreatePostDto,
    examples: {
      video: {
        summary: 'postType = "video"',
        value: {
          postType: 'video',
          authorId: '6766fdb720f78014bf83d5a3',
          tags: ['Ford'],
          name: 'Первый пост не менее 20 символов',
          url: 'https://www.youtube.com/watch?v=Cvp41PCQKOs',
        },
      },
      text: {
        summary: 'postType = "text"',
        value: {
          postType: 'text',
          authorId: '6766fdb720f78014bf83d5a3',
          name: 'Первый пост не менее 20 символов',
          preview:
            'Анонс текста, который должен быть длинной около 50 символов',
          text: 'Текст поста нужно чтобы был аж 100 символов Текст поста нужно чтобы был аж 100 символов Текст поста нужно чтобы был аж 100 символов',
        },
      },
      quote: {
        summary: 'postType = "quote"',
        value: {
          postType: 'quote',
          authorId: '6766fdb720f78014bf83d5a3',
          quoteText:
            'Кто хочет, тот ищет возможности, кто не хочет — ищет причины.',
          quoteAuthor: 'Сократ',
        },
      },
      photo: {
        summary: 'postType = "photo"',
        value: {
          postType: 'photo',
          authorId: '6766fdb720f78014bf83d5a3',
          tags: ['Ford', 'Retro'],
          url: '/images/photo.jpeg',
        },
      },
      link: {
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
  updatePhoto: {
    schema: {
      type: 'object',
      properties: {
        photoFile: {
          type: 'string',
          format: 'binary',
          description: 'The photo file to upload',
        },
        publicationDate: {
          type: 'date',
          description: 'The post publish date (empty -> state=draft)',
          example: '2024-07-09',
        },
        tags: {
          type: 'string',
          description: 'Comma-separated list of post tags',
          example: 'tag-1, tag-2',
        },
      },
    },
  },
  update: {
    type: UpdatePostDto,
    examples: {
      draft: {
        summary: 'state = "draft"',
        value: {
          postType: 'video',
          publicationDate: null,
        },
      },
      tag: {
        summary: 'add tags"',
        value: {
          postType: 'photo',
          tags: ['tagq', 'tag2', 'tag3'],
        },
      },
      text: {
        summary: 'update text post',
        value: {
          postType: 'text',
          preview:
            'Измененный анонс текста, который должен быть длинной около 50 символов',
        },
      },
    },
  },
} as const;
