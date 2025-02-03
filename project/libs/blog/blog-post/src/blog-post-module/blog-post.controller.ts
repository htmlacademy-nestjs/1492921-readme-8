import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { fillDto } from '@project/shared-helpers';

import { BlogPostService } from './blog-post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostRdo } from './rdo/blog-post.rdo';
import { BlogPostQuery, BlogPostSearch } from './blog-post.query';
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';
import { UpdatePostDto } from './dto/update-post.dto';

import { BlogPostResponse } from './swagger/blog-post-response';
import { BlogPostParam } from './swagger/blog-post-param';
import { BlogPostBody } from './swagger/blog-post-request';
import { UserIdDto } from './dto/user-id.dto';
import { BlogPostOperation } from './swagger/blog-post-operation';
import { CommonResponse } from '@project/shared-core';

@ApiTags('Posts')
@Controller('posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @Get('')
  @ApiOperation(BlogPostOperation.Index)
  @ApiResponse(BlogPostResponse.PostList)
  @ApiResponse(CommonResponse.BadRequest)
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @Get('search')
  @ApiOperation(BlogPostOperation.Search)
  @ApiResponse(BlogPostResponse.SearchPosts)
  @ApiResponse(CommonResponse.BadRequest)
  public async search(@Query() query: BlogPostSearch): Promise<BlogPostRdo[]> {
    const postEntities = await this.blogPostService.findByName(query);

    return postEntities.map((postEntity) =>
      fillDto(BlogPostRdo, postEntity.toPOJO())
    );
  }

  @Get(':postId')
  @ApiOperation(BlogPostOperation.View)
  @ApiResponse(BlogPostResponse.PostFound)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiParam(BlogPostParam.PostId)
  public async show(@Param(BlogPostParam.PostId.name) postId: string) {
    const post = await this.blogPostService.getPost(postId);
    return fillDto(BlogPostRdo, post.toPOJO());
  }

  @Post('')
  @ApiOperation(BlogPostOperation.Create)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiBody(BlogPostBody.create)
  //@ApiHeader(BlogPostHeader.RequestId)
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @Patch(':postId')
  @ApiOperation(BlogPostOperation.Update)
  @ApiResponse(BlogPostResponse.PostUpdated)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiBody(BlogPostBody.update)
  public async update(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() dto: UpdatePostDto
  ) {
    const updatedPost = await this.blogPostService.updatePost(postId, dto);
    return fillDto(BlogPostRdo, updatedPost.toPOJO());
  }

  @Delete(':postId')
  @ApiOperation(BlogPostOperation.Delete)
  @ApiResponse(BlogPostResponse.PostDeleted)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiParam(BlogPostParam.PostId)
  @HttpCode(BlogPostResponse.PostDeleted.status)
  public async delete(
    @Param(BlogPostParam.PostId.name) postId: string
  ): Promise<void> {
    await this.blogPostService.deletePost(postId);
  }

  @Post(':postId/repost')
  @ApiOperation(BlogPostOperation.Repost)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiParam(BlogPostParam.PostId)
  public async createRepost(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() { userId }: UserIdDto
  ) {
    const newPost = await this.blogPostService.createRepost(postId, userId);

    return fillDto(BlogPostRdo, newPost.toPOJO());
  }
}
