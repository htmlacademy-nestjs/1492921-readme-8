import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostQuery } from './blog-post.query';
import { PaginationResult } from '@project/shared-types';
import { UpdatePostDto } from './dto/update-post.dto';
import { TagSetup } from './blog-post.constant';

@Injectable()
export class BlogPostService {
  constructor(private blogPostRepository: BlogPostRepository) {}

  private checkTags(tags: string[]): string[] {
    if (tags && tags.length > 0) {
      const uniqueTags = [...new Set(tags)];
      if (uniqueTags.length > TagSetup.MaxCount) {
        throw new BadRequestException(
          `The number of tags should be no more than ${TagSetup.MaxCount}`
        );
      }
      const result = uniqueTags.map((tag): string => {
        if (!/^#([a-zA-Zа-яА-Я])([a-zA-Zа-яА-Я0-9_\\-]{2,9})$/.test(tag)) {
          throw new BadRequestException(
            `The tag must start with a letter and be at least ${TagSetup.MinChar} and no more than ${TagSetup.MaxChar} characters long`
          );
        }
        return tag.toLowerCase();
      });
      return result;
    }
    return tags;
  }

  public async getAllPosts(
    query?: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const newPost = BlogPostFactory.createFromCreatePostDto({
      ...dto,
      tags: this.checkTags(dto.tags),
    });
    return await this.blogPostRepository.save(newPost);
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
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
}
