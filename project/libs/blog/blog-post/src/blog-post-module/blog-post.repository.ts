import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  PaginationResult,
  Post,
  SortDirection,
  Tag,
} from '@project/shared-core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/blog-models';

import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import {
  BlogPostCountQuery,
  BlogPostQuery,
  BlogPostSearchQuery,
} from './blog-post.query';
import { calculatePage } from '@project/shared-helpers';

@Injectable()
export class BlogPostRepository extends BasePostgresRepository<
  BlogPostEntity,
  Post
> {
  constructor(
    entityFactory: BlogPostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private prepareTagForEntity(tags: Tag[]): string[] {
    return tags.map((tag) => tag.name);
  }

  private async getPostCount(where: Prisma.vPostWhereInput): Promise<number> {
    return this.client.vPost.count({ where });
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    // удаление избыточных полей
    delete pojoEntity.id;
    delete pojoEntity.isRepost;
    delete pojoEntity.repostAuthorId;
    delete pojoEntity.state;

    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        tags: {
          connectOrCreate: pojoEntity.tags.map((tag) => ({
            create: { name: tag },
            where: { name: tag },
          })),
        },
        comments: {
          connect: [],
        },
      },
    });
    const postEntity = await this.findById(record.id);
    if (postEntity) {
      return postEntity;
    }
    throw new Error('Unexpected error');
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const record = await this.client.vPost.findUnique({
      where: {
        id,
      },
      include: {
        comments: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }
    return this.createEntityFromDocument(record);
  }

  public async update(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.update({
      where: { id: entity.id },
      data: {
        postType: pojoEntity.postType,
        repostId: pojoEntity.repostId || null,
        tags: {
          set: [],
          connectOrCreate: pojoEntity.tags.map((tag) => ({
            create: { name: tag },
            where: { name: tag },
          })),
        },
        publicationDate: pojoEntity.publicationDate,
        likesCount: pojoEntity.likesCount,
        commentsCount: pojoEntity.commentsCount,
        name: pojoEntity.name,
        url: pojoEntity.url,
        preview: pojoEntity.preview,
        text: pojoEntity.text,
        quoteText: pojoEntity.quoteText,
        quoteAuthor: pojoEntity.quoteAuthor,
        description: pojoEntity.description,
      },
    });
    return await this.findById(record.id);
  }

  public async find(
    query?: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.vPostWhereInput = {};
    const orderBy: Prisma.vPostOrderByWithRelationInput = {};

    if (query?.tags) {
      where.tags = {
        hasSome: query.tags,
      };
    }

    if (query?.postType) {
      where.postType = query.postType;
    }

    const currentDate = new Date();
    if (query?.myDraft) {
      where.authorId = query?.userId ?? '-';
      where.publicationDate = { equals: null };
    } else {
      where.publicationDate = { not: null, lt: currentDate };
      if (query?.authorId) {
        where.authorId = query.authorId;
      }
    }
    if (query?.sortBy) {
      orderBy[query.sortBy] = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.vPost.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: calculatePage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }

  public async search(query: BlogPostSearchQuery): Promise<BlogPostEntity[]> {
    const currentDate = new Date();
    const posts = await this.client.vPost.findMany({
      where: {
        OR: [
          { name: { contains: query.name, mode: 'insensitive' } },
          { quoteText: { contains: query.name, mode: 'insensitive' } },
          { description: { contains: query.name, mode: 'insensitive' } },
        ],
        publicationDate: { not: null, lt: currentDate },
      },
      take: query.limit,
    });
    return posts.map((post) => this.createEntityFromDocument(post));
  }

  public async existsRepost(postId: string, userId: string): Promise<boolean> {
    const count = await this.client.post.count({
      where: { repostId: postId, authorId: userId },
    });

    return count > 0;
  }

  public async postsCount(query: BlogPostCountQuery): Promise<number> {
    const currentDate = new Date();
    return await this.client.post.count({
      where: {
        authorId: query.userId,
        publicationDate: { not: null, lt: currentDate },
      },
    });
  }

  public async findPublishedPostsLaterDate(
    startDate: Date,
    userId?: string
  ): Promise<BlogPostEntity[]> {
    const where: Prisma.vPostWhereInput = {};
    const orderBy: Prisma.vPostOrderByWithRelationInput = {};
    const currentDate = new Date();
    if (startDate !== null) {
      where.publicationDate = { not: null, gte: startDate, lt: currentDate };
    } else {
      // Если startDate null, то выбираем все записи до текущей даты
      where.publicationDate = { not: null, lt: currentDate };
    }
    if (userId) {
      where.authorId = userId;
    }
    orderBy.publicationDate = SortDirection.Asc;
    console.log('where', where);
    const posts = await this.client.vPost.findMany({
      where,
      orderBy,
    });
    return posts.map((post) => this.createEntityFromDocument(post));
  }
}
