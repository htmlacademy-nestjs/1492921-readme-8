import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { BlogPostService } from '@project/blog-post';

import { UserIdDto } from './dto/user-id.dto';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeResponseMessage } from './blog-like.constant';

@Controller('posts/:id/likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService,
    private readonly blogPostService: BlogPostService
  ) {}

  @Post('/')
  @ApiTags('likes')
  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogLikeResponseMessage.SetLike,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogLikeResponseMessage.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogLikeResponseMessage.PostNotFound,
  })
  @HttpCode(HttpStatus.OK)
  public async addLike(
    @Param('id') postId: string,
    @Body() { userId }: UserIdDto
  ) {
    await this.blogLikeService.AddLike({ postId, userId });
    await this.blogPostService.updateLikeCount(postId, 1);
  }

  @Delete('/')
  @ApiTags('likes')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogLikeResponseMessage.DelLike,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogLikeResponseMessage.Unauthorized,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogLikeResponseMessage.PostNotFound,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteLike(
    @Param('id') postId: string,
    @Body() { userId }: UserIdDto
  ) {
    await this.blogLikeService.DelLike({ postId, userId });
    await this.blogPostService.updateLikeCount(postId, -1);
  }
}
