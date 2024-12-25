import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { BlogPostService } from './blog-post.service';
import { CreatePostDto } from './dto/create-post.dto';
//import { BlogPostRdo } from '../rdo/blog-post.rdo';
//import { fillDto } from '@project/shared-helpers';

@Controller('posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPost(id);
    return post.toPOJO();
  }

  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);
    return newPost.toPOJO();
  }
}
