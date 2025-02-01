import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PaginationResult, PostState } from '@project/shared-types';

import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostQuery } from './blog-post.query';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogPostProperty } from './swagger/blog-post-property';
import { BlogPostError } from './blog-post.constant';

const dtoFieldsMissing = {
  video: ['preview', 'text', 'quoteText', 'quoteAuthor', 'description'],
  text: ['url', 'quoteText', 'quoteAuthor', 'description'],
  quote: ['name', 'url', 'preview', 'text', 'description'],
  photo: ['name', 'preview', 'text', 'quoteText', 'quoteAuthor', 'description'],
  link: ['name', 'preview', 'text', 'quoteText', 'quoteAuthor'],
};

@Injectable()
export class BlogPostService {
  constructor(private blogPostRepository: BlogPostRepository) {}

  private checkTags(tags: string[]): string[] {
    console.log('tags', tags);
    if (tags && tags.length > 0) {
      const uniqueTags = [...new Set(tags)];
      console.log('length', uniqueTags.length);
      if (uniqueTags.length > BlogPostProperty.Tags.Validate.MaxCount) {
        throw new BadRequestException(
          BlogPostProperty.Tags.Validate.MessageCount
        );
      }
      const result = uniqueTags.map((tag): string => {
        console.log('tag', tag);
        if (!BlogPostProperty.Tags.Validate.RegExp.test(tag)) {
          console.log('test tag', tag);
          throw new BadRequestException(BlogPostProperty.Tags.Validate.Message);
        }
        return tag.toLowerCase();
      });
      return result;
    }
    return [];
  }

  private checkDTO(dto: CreatePostDto | UpdatePostDto): void {
    const { postType } = dto;
    const errors: string[] = [];
    dtoFieldsMissing[postType].forEach((field) => {
      if (dto[field]) {
        errors.push(field);
      }
    });

    if (errors.length > 0) {
      throw new BadRequestException(
        `For post type = ${postType} ${errors.join(', ')} is not required`
      );
    }
  }

  public async getAllPosts(
    query?: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    this.checkDTO(dto);
    const newPost = BlogPostFactory.createNewPost({
      ...dto,
      tags: this.checkTags(dto.tags),
    });
    return await this.blogPostRepository.save(newPost);
  }

  public async deletePost(postId: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(postId);
    } catch {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
  }

  public async getPost(postId: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(postId);
  }

  public async updatePost(
    id: string,
    dto: UpdatePostDto
  ): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
    if (!existsPost) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }
    if (existsPost.postType != dto.postType) {
      throw new NotFoundException('postType cannot be changed');
    }
    this.checkDTO(dto);
    let hasChanges = false;
    const dtoUpdate = { ...dto, tags: this.checkTags(dto.tags) };
    for (const [key, value] of Object.entries(dtoUpdate)) {
      if (value !== undefined && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }
    }
    if (hasChanges) {
      return await this.blogPostRepository.update(existsPost);
    }
    return existsPost;
  }

  public async updateLikeCount(
    postId: string,
    diffValue: number
  ): Promise<void> {
    const existPost = await this.getPost(postId);
    existPost.likesCount += diffValue;
    await this.blogPostRepository.update(existPost);
  }

  public async createRepost(
    postId: string,
    userId: string
  ): Promise<BlogPostEntity> {
    const existsPost = await this.getPost(postId);

    const existsRepost = await this.blogPostRepository.existsRepost(
      postId,
      userId
    );

    if (existsRepost) {
      throw new ConflictException(BlogPostError.RepostExist);
    }

    const newPost = BlogPostFactory.createRepost(existsPost.toPOJO(), userId);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }
}
