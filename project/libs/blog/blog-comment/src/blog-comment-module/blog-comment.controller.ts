import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDto } from '@project/shared-helpers';
import { BlogPostParam, BlogPostResponse, UserIdDto } from '@project/blog-post';
import { CommonResponse } from '@project/shared-core';

import { BlogCommentParam } from './swagger/blog-comment-param';
import { BlogCommentOperation } from './swagger/blog-comment-operation';
import { BlogCommentResponse } from './swagger/blog-comment-response';
import { CreateBlogCommentDto } from './dto/create-blog-comment.dto';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentRdo } from './rdo/blog-comment.rdo';
import { BlogCommentQuery } from './blog-comment.query';
import { BlogCommentWithPaginationRdo } from './dto/blog-comment-with-pagination.rdo';

@ApiTags('Comments')
@Controller('posts')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {}

  @Get('/:postId/comments')
  @ApiOperation(BlogCommentOperation.Index)
  @ApiResponse(BlogCommentResponse.CommentList)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiParam(BlogPostParam.PostId)
  public async index(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Query() query: BlogCommentQuery
  ) {
    const commentsWithPagination = await this.blogCommentService.getComments(
      postId,
      query
    );
    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((comment) =>
        comment.toPOJO()
      ),
    };
    return fillDto(BlogCommentWithPaginationRdo, result);
  }

  @Post(':postId/comments')
  @ApiOperation(BlogCommentOperation.AddComment)
  @ApiResponse(BlogCommentResponse.AddComment)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  public async createComment(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() dto: CreateBlogCommentDto
  ) {
    const newComment = await this.blogCommentService.addComment(postId, dto);
    return fillDto(BlogCommentRdo, newComment.toPOJO());
  }

  @Delete('comments/:commentId')
  @ApiOperation(BlogCommentOperation.DelComment)
  @ApiResponse(BlogCommentResponse.DelComment)
  @ApiResponse(BlogCommentResponse.CommentNotFound)
  @ApiResponse(BlogCommentResponse.NotAllow)
  @ApiResponse(CommonResponse.BadRequest)
  public async deleteComment(
    @Param(BlogCommentParam.CommentId.name) commentId: string,
    @Body() { userId }: UserIdDto
  ) {
    await this.blogCommentService.delComment(commentId, userId);
  }
}
