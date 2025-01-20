import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BlogPostService } from '@project/blog-post';

import { UserIdDto } from './dto/user-id.dto';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeResponseMessage } from './blog-like.constant';

@ApiTags('Likes')
@Controller('posts/:id/likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService,
    private readonly blogPostService: BlogPostService
  ) {}

  @Post('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogLikeResponseMessage.SetLike,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogLikeResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: BlogLikeResponseMessage.LikeExists,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: BlogLikeResponseMessage.PostIsDraft,
  })
  @HttpCode(HttpStatus.OK)
  public async addLike(
    @Param('id') postId: string,
    @Body() { userId }: UserIdDto
  ) {
    await this.blogLikeService.addLike({ postId, userId });
    await this.blogPostService.updateLikeCount(postId, 1);
  }

  @Delete('/')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogLikeResponseMessage.DelLike,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogLikeResponseMessage.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogLikeResponseMessage.LikeNotFound,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteLike(
    @Param('id') postId: string,
    @Body() { userId }: UserIdDto
  ) {
    await this.blogLikeService.delLike({ postId, userId });
    await this.blogPostService.updateLikeCount(postId, -1);
  }
}
