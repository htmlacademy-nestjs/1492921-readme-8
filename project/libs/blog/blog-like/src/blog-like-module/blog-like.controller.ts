import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  BlogPostParam,
  BlogPostResponse,
  BlogPostService,
  UserIdDto,
} from '@project/blog-post';

import { BlogLikeService } from './blog-like.service';
import { BlogLikeOperation } from './swagger/blog-like-operation';
import { BlogLikeResponse } from './swagger/blog-like-response';

@ApiTags('Likes')
@Controller('posts/:postId/likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService,
    private readonly blogPostService: BlogPostService
  ) {}

  @Post('/')
  @ApiOperation(BlogLikeOperation.SetLike)
  @ApiResponse(BlogLikeResponse.SetLike)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(BlogLikeResponse.LikeExists)
  @ApiResponse(BlogPostResponse.PostIsDraft)
  public async addLike(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() { userId }: UserIdDto
  ) {
    await this.blogLikeService.addLike({ postId, userId });
    await this.blogPostService.updateLikeCount(postId, 1);
  }

  @Delete('/')
  @ApiOperation(BlogLikeOperation.DelLike)
  @ApiResponse(BlogLikeResponse.DelLike)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(BlogLikeResponse.LikeNotFound)
  public async deleteLike(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() { userId }: UserIdDto
  ) {
    await this.blogLikeService.delLike({ postId, userId });
    await this.blogPostService.updateLikeCount(postId, -1);
  }
}
