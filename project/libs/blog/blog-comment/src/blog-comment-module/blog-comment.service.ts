import { Injectable } from '@nestjs/common';

import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogPostService } from '@project/blog-post';
import { BlogCommentFactory } from './blog-comment.factory';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory,
    private readonly blogPostService: BlogPostService
  ) {}

  public async getComments(postId: string): Promise<BlogCommentEntity[]> {
    return this.blogCommentRepository.findByPostId(postId);
  }

  public async addComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<BlogCommentEntity> {
    const existsPost = await this.blogPostService.getPost(postId);
    const newComment = this.blogCommentFactory.createFromDto(
      dto,
      existsPost.id
    );

    return await this.blogCommentRepository.save(newComment);
  }
}
