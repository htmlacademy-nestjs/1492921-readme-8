import { PostType, PrismaClient } from '@prisma/client';

const POST_UIDS = [
  '2b7a9322-353a-41e4-b009-4c1a83ad15e5',
  '7e00699f-5847-45bb-9227-7c59190d0470',
  'b4c56be0-712f-434f-b304-ff76263c94f1',
  '925f4a8d-a144-445e-9327-82a507c5ae76',
  '142cb7ca-cd50-4110-8d2d-deee1ef8f223',
];

const FIRST_USER_ID = '6766cb736c313811f627c05e';
const SECOND_USER_ID = '6766cbb86c313811f627c062';

function getPosts() {
  return [
    {
      id: POST_UIDS[0],
      postType: PostType.Text,
      authorId: FIRST_USER_ID,
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
      id: POST_UIDS[1],
      postType: PostType.Photo,
      authorId: SECOND_USER_ID,
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
          userId: FIRST_USER_ID,
        },
        {
          text: 'Надо будет обязательно посетить',
          userId: SECOND_USER_ID,
        },
      ],
    },
    {
      id: POST_UIDS[2],
      postType: PostType.Quote,
      authorId: SECOND_USER_ID,
      repostId: null,
      tags: {},
      publicationDate: new Date().toISOString(),
      quoteText:
        'Кто хочет, тот ищет возможности, кто не хочет — ищет причины.',
      quoteAuthor: 'Сократ',
      comments: [],
    },
    {
      id: POST_UIDS[3],
      postType: PostType.Link,
      authorId: SECOND_USER_ID,
      repostId: null,
      tags: {},
      publicationDate: new Date().toISOString(),
      url: 'https://up.htmlacademy.ru/profession/fullstack/8/nodejs-2/8',
      description: 'Node.js и Nest.js. Микросервисная архитектура',
      comments: [],
    },
    {
      id: POST_UIDS[4],
      postType: PostType.Video,
      authorId: FIRST_USER_ID,
      repostId: POST_UIDS[0],
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
