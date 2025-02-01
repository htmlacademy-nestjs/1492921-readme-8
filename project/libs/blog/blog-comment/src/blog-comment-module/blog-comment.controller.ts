import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { BlogCommentService } from './blog-comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { fillDto } from '@project/shared-helpers';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = await this.blogCommentService.getComments(postId);
    return fillDto(
      CommentRdo,
      comments.map((comment) => comment.toPOJO())
    );
  }

  @Post('/:id/comments')
  public async createComment(
    @Param('id') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.blogCommentService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
