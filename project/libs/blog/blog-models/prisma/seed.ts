import { PostType, PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';

const USERS = [
  { id: '6766cb736c313811f627c05e', name: 'Alexey Ivanov', avatarUrl: '' },
  { id: '6766cbb86c313811f627c062', name: 'Ivan Petrov', avatarUrl: '' },
];

function getPosts() {
  const firstUID = randomUUID();

  return [
    {
      id: firstUID,
      postType: PostType.text,
      authorId: USERS[0].id,
      repostId: null,
      tags: {
        connectOrCreate: [
          {
            create: { name: '#auto' },
            where: { name: '#auto' },
          },
        ],
      },
      publicationDate: new Date().toISOString(),
      name: 'Тестовый пост 1',
      preview: 'Тестовый анонс первого поста',
      text: 'Тестовый текст первого поста',
      comments: [],
    },
    {
      id: randomUUID(),
      postType: PostType.photo,
      authorId: USERS[1].id,
      repostId: null,
      tags: {
        connectOrCreate: [
          {
            create: { name: '#travel' },
            where: { name: '#travel' },
          },
          {
            create: { name: '#database' },
            where: { name: '#database' },
          },
        ],
      },
      publicationDate: new Date().toISOString(),
      url: 'https://i.pinimg.com/originals/42/16/cc/4216ccf53e2bb83c8dd18da5a5d97307.jpg',
      comments: [
        {
          text: 'Крутое фото',
          userId: USERS[0].id,
        },
        {
          text: 'Надо будет обязательно посетить',
          userId: USERS[1].id,
        },
      ],
    },
    {
      id: randomUUID(),
      postType: PostType.quote,
      authorId: USERS[0].id,
      repostId: null,
      tags: {},
      publicationDate: new Date().toISOString(),
      quoteText:
        'Кто хочет, тот ищет возможности, кто не хочет — ищет причины.',
      quoteAuthor: 'Сократ',
      comments: [],
    },
    {
      id: randomUUID(),
      postType: PostType.link,
      authorId: USERS[1].id,
      repostId: null,
      tags: {},
      publicationDate: new Date().toISOString(),
      url: 'https://up.htmlacademy.ru/profession/fullstack/8/nodejs-2/8',
      description: 'Node.js и Nest.js. Микросервисная архитектура',
      comments: [],
    },
    {
      id: randomUUID(),
      postType: PostType.video,
      authorId: USERS[1].id,
      repostId: firstUID,
      tags: {
        connectOrCreate: [
          {
            create: { name: '#moscow' },
            where: { name: '#moscow' },
          },
        ],
      },
      publicationDate: new Date().toISOString(),
      name: 'Кремль',
      url: 'https://ic.pics.livejournal.com/anton_i_masha/74760968/910048/910048_2000.jpg',
      comments: [],
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();

  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        postType: post.postType,
        authorId: post.authorId,
        repostId: post.repostId,
        tags: post.tags,
        commentsCount: post.comments.length,
        publicationDate: post.publicationDate,
        comments: post.comments.length
          ? {
              create: post.comments,
            }
          : undefined,
        name: post.name,
        preview: post.preview,
        text: post.text,
        url: post.url,
        quoteText: post.quoteText,
        quoteAuthor: post.quoteAuthor,
        description: post.description,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
