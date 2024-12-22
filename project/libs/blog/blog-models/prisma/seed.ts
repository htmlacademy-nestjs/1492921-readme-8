import { PostType, PrismaClient } from '@prisma/client';

const TAGS = ['#auto', '#travel', '#database'];

const FIRST_POST_UUID = '2b7a9322-353a-41e4-b009-4c1a83ad15e5';
const SECOND_POST_UUID = '7e00699f-5847-45bb-9227-7c59190d0470';

const FIRST_USER_ID = '6766cb736c313811f627c05e';
const SECOND_USER_ID = '6766cbb86c313811f627c062';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
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
      id: SECOND_POST_UUID,
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
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  for (const tag of TAGS) {
    await prismaClient.tag.upsert({
      where: { name: tag },
      update: {},
      create: { name: tag },
    });
  }

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
