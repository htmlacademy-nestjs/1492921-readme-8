import { Injectable } from '@nestjs/common';
//import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
//import dayjs from 'dayjs';

import { BlogPostRepository } from './blog-post.repository';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { CreatePostDto } from '../dto/create-post.dto';
//import { Post, PostState, PostType } from '@project/shared-types';
//import { blogPostError } from './blog-post.constant';

Injectable();
export class BlogPostService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    // const {
    //   postType,
    //   authorId,
    //   repostId,
    //   tags,
    //   name,
    //   url,
    //   preview,
    //   text,
    //   quoteAuthorId,
    //   quoteText,
    //   description
    // } = dto;

    // let repost: Post;
    // if (repostId) {
    //   repost = await this.blogPostRepository.findById(repostId);
    //   if (!repost) {
    //     throw new NotFoundException(blogPostError.PostNotFound);
    //   }
    // }

    // const blogPost: Post = {
    //   postType,
    //   authorId,
    //   isRepost: repostId ? true : false,
    //   repostId,
    //   repostAuthorId: repost?.authorId,
    //   tags,
    //   name,
    //   url,
    //   preview,
    //   text,
    //   quoteAuthorId,
    //   quoteText,
    //   description,
    // };

    // if ((postType === PostType.Video) && (!name || !url)  ||
    //     (postType === PostType.Text) && (!name || !preview || !text) ||
    //     (postType === PostType.Quote) && (!quoteAuthorId  || !quoteText ) ||
    //     (postType === PostType.Photo) && !url ||
    //     (postType === PostType.Link && (!url  || !description )))
    // {
    //     throw new BadRequestException();
    // }

    const newPost = BlogPostFactory.createFromCreatePostDto(dto);
    console.log('blogPostRepository');
    console.log(this.blogPostRepository);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }
}
