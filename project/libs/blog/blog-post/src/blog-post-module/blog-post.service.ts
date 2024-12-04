import { Injectable } from '@nestjs/common';
import { BlogPostRepository } from './blog-post.repository';

Injectable();
export class BlogPostService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}
}
