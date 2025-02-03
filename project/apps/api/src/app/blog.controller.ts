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
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  ApiBearerAuth,
  ApiBody,
  ApiBodyOptions,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectUserIdInterceptor } from '@project/interceptors';
import FormData from 'form-data';
import * as url from 'node:url';

import {
  BlogPostBody,
  BlogPostEntity,
  BlogPostOperation,
  BlogPostParam,
  BlogPostProperty,
  BlogPostRdo,
  BlogPostResponse,
  BlogPostSearch,
  CreatePostDto,
} from '@project/blog-post';
import {
  BlogCommentEntity,
  BlogCommentOperation,
  BlogCommentParam,
  BlogCommentQuery,
  BlogCommentResponse,
} from '@project/blog-comment';
import { BlogLikeOperation, BlogLikeResponse } from '@project/blog-like';

import {
  ImageFileInterceptor,
  multerFileToFormData,
} from '@project/shared-helpers';
import { UploadedFileRdo } from '@project/file-uploader';
import { BlogUserEntity } from '@project/blog-user';
import {
  CommonResponse,
  PaginationResult,
  PostType,
} from '@project/shared-core';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { CheckPublishedPostGuard } from './guards/check-published-post.guard ';
import { CheckMyPostGuard } from './guards/check-my-post.guard';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { CreatePhotoPostDto } from './dto/create-photo-post.dto';
import { InjectUserIdQueryInterceptor } from './interceptors/inject-user-id-query.interceptor';
import { ApiBlogPostQuery } from './dto/api-blog-post-query';
import { AddBlogCommentDto } from './dto/add-blog-comment.dto';

function updateApiBodyOptions(
  apiBodyOptions: typeof BlogPostBody.create
): ApiBodyOptions {
  const copy = JSON.parse(JSON.stringify(apiBodyOptions));
  delete copy.examples.photo;
  delete copy.examples.video.value.authorId;
  delete copy.examples.text.value.authorId;
  delete copy.examples.quote.value.authorId;
  delete copy.examples.link.value.authorId;
  return copy;
}
@ApiTags('Blogs')
@Controller('blogs')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  // Преобразуем tags в массив, предполагая, что разные тэги разделены запятой
  // это из-зи кривости сваггера, которые некорректно работает с массивами
  private tagsToArray(dto) {
    if (typeof dto['tags'] === 'string') {
      const tags: string = dto['tags'];
      if (tags !== '') {
        dto.tags = tags.split(',').map((tag) => tag.trim());
      } else {
        dto.tags = [];
      }
    }
  }

  @Get('posts')
  @ApiOperation(BlogPostOperation.Index)
  @ApiResponse(BlogPostResponse.PostList)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdQueryInterceptor)
  public async indexPost(
    @Query() query: ApiBlogPostQuery,
    @Req() req: Request
  ) {
    const userId = query['userId'];
    const queryString = url.parse(req.url).query;
    const queryParams = userId
      ? `${queryString}&userId=${userId}`
      : queryString;
    const post = await this.httpService.axiosRef.get<
      PaginationResult<BlogPostEntity>
    >(`${ApplicationServiceURL.Blogs}?${queryParams}`, {});

    // Добавляем информацию об авторах к постам
    // По-хорошему я думаю нужно в сервисе блогов хранить минимальные данные об авторах постов
    // и синхронизировать их с сервисом авторизации через RabbitMQ
    for (const postEntity of post.data.entities) {
      try {
        // Получаем информацию об авторе
        const authorResponse =
          await this.httpService.axiosRef.get<BlogUserEntity>(
            `${ApplicationServiceURL.Users}/${postEntity.authorId}`,
            {}
          );

        // Добавляем информацию об авторе к посту
        postEntity['author'] = {
          name: authorResponse.data.name,
          email: authorResponse.data.email,
        };
      } catch (error) {
        postEntity['author'] = {
          name: '--Not found--',
          email: '--Not found--',
        };
        console.error(
          `Failed to fetch author (id = ${postEntity.authorId}) for post ${postEntity.id}:`,
          error.data
        );
      }
    }
    return post.data;
  }

  @Get('search')
  @ApiOperation(BlogPostOperation.Search)
  @ApiResponse(BlogPostResponse.SearchPosts)
  @ApiResponse(CommonResponse.BadRequest)
  public async search(
    @Query() query: BlogPostSearch,
    @Req() req: Request
  ): Promise<BlogPostRdo[]> {
    const queryString = url.parse(req.url).query;
    const post = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blogs}/search?${queryString}`,
      {}
    );
    return post.data;
  }

  @Post('posts/photo')
  @ApiOperation(BlogPostOperation.CreatePhoto)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(CommonResponse.UserNotAuth)
  @ApiBody(BlogPostBody.createPhoto)
  @ApiBearerAuth('accessToken')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(
    ImageFileInterceptor(BlogPostProperty.PhotoFile.Validate, 'photoFile')
  )
  @UseGuards(CheckAuthGuard)
  public async createPhoto(
    @Body() dto: CreatePhotoPostDto,
    @UploadedFile() photoFile?: Express.Multer.File
  ) {
    this.tagsToArray(dto);
    const form = new FormData();
    if (photoFile) {
      multerFileToFormData(form, photoFile, 'file');
      const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(
        `${ApplicationServiceURL.Files}/upload`,
        form
      );
      dto['url'] = `${data.subDirectory}/${data.hashName}`;
    }
    const post = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blogs}/`,
      { ...dto, postType: PostType.Photo, authorId: dto['userId'] }
    );
    return post.data;
  }

  @Patch('posts/photo/:postId')
  @ApiOperation(BlogPostOperation.UpdatePhoto)
  @ApiResponse(BlogPostResponse.PostUpdated)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(BlogPostResponse.NotAllow)
  @ApiResponse(CommonResponse.UserNotAuth)
  @ApiBody(BlogPostBody.updatePhoto)
  @ApiBearerAuth('accessToken')
  @ApiConsumes('multipart/form-data')
  @ApiParam(BlogPostParam.PostId)
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(
    ImageFileInterceptor(BlogPostProperty.PhotoFile.Validate, 'photoFile')
  )
  @UseGuards(CheckMyPostGuard)
  public async updatePhoto(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() dto: UpdateBlogPostDto,
    @UploadedFile() photoFile?: Express.Multer.File
  ) {
    this.tagsToArray(dto);
    const form = new FormData();
    if (photoFile) {
      multerFileToFormData(form, photoFile, 'file');
      const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(
        `${ApplicationServiceURL.Files}/upload`,
        form
      );
      dto.url = `${data.subDirectory}/${data.hashName}`;
    }

    const post = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Blogs}/${postId}`,
      { ...dto, postType: PostType.Photo }
    );
    return post.data;
  }

  @Post('posts')
  @ApiOperation(BlogPostOperation.Create)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(CommonResponse.UserNotAuth)
  @ApiBody(updateApiBodyOptions(BlogPostBody.create))
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckAuthGuard)
  public async createPost(@Body() dto: CreatePostDto) {
    const post = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blogs}/`,
      { ...dto, authorId: dto['userId'] }
    );
    return post.data;
  }

  @Patch('posts/:postId')
  @ApiOperation(BlogPostOperation.Update)
  @ApiResponse(BlogPostResponse.PostUpdated)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(BlogPostResponse.NotAllow)
  @ApiResponse(CommonResponse.UserNotAuth)
  @ApiBody(BlogPostBody.update)
  @ApiBearerAuth('accessToken')
  @ApiParam(BlogPostParam.PostId)
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(
    ImageFileInterceptor(BlogPostProperty.PhotoFile.Validate, 'photoFile')
  )
  @UseGuards(CheckMyPostGuard)
  public async updatePost(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() dto: UpdateBlogPostDto,
    @UploadedFile() photoFile?: Express.Multer.File
  ) {
    const form = new FormData();
    if (photoFile) {
      multerFileToFormData(form, photoFile, 'file');
      const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(
        `${ApplicationServiceURL.Files}/upload`,
        form
      );
      dto.url = `${data.subDirectory}/${data.hashName}`;
    }
    const post = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Blogs}/${postId}`,
      dto
    );
    return post.data;
  }

  @Delete('posts/:postId')
  @ApiOperation(BlogPostOperation.Delete)
  @ApiResponse(BlogPostResponse.PostDeleted)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(BlogPostResponse.NotAllow)
  @ApiBearerAuth('accessToken')
  @ApiParam(BlogPostParam.PostId)
  @HttpCode(BlogPostResponse.PostDeleted.status)
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckMyPostGuard)
  public async deletePost(@Param(BlogPostParam.PostId.name) postId: string) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blogs}/${postId}`,
      null
    );
    return data;
  }

  @Get('posts/:postId')
  @ApiOperation(BlogPostOperation.View)
  @ApiResponse(BlogPostResponse.PostFound)
  @ApiResponse(BlogPostResponse.PostNotFound)
  public async show(@Param(BlogPostParam.PostId.name) postId: string) {
    const post = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Blogs}/${postId}`,
      null
    );
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${post.data.authorId}`,
      null
    );
    return { ...post.data, author: data };
  }

  @Post('posts/:postId/repost')
  @ApiOperation(BlogPostOperation.Repost)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(CommonResponse.UserNotAuth)
  @ApiResponse(BlogPostResponse.PostIsDraft)
  @ApiBearerAuth('accessToken')
  @ApiParam(BlogPostParam.PostId)
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckAuthGuard)
  @UseGuards(CheckPublishedPostGuard)
  public async createRepost(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() body
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blogs}/${postId}/repost`,
      body
    );

    return data;
  }

  @Post('posts/:postId/likes')
  @ApiOperation(BlogLikeOperation.SetLike)
  @ApiResponse(BlogLikeResponse.SetLike)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(BlogLikeResponse.LikeExists)
  @ApiResponse(BlogPostResponse.PostIsDraft)
  @ApiResponse(CommonResponse.UserNotAuth)
  @ApiParam(BlogPostParam.PostId)
  @ApiBearerAuth('accessToken')
  @HttpCode(BlogLikeResponse.SetLike.status)
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckAuthGuard)
  @UseGuards(CheckPublishedPostGuard)
  public async addLike(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() body
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blogs}/${postId}/likes`,
      body
    );

    return data;
  }

  @Delete('posts/:postId/likes')
  @ApiOperation(BlogLikeOperation.DelLike)
  @ApiResponse(BlogLikeResponse.DelLike)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(BlogLikeResponse.LikeNotFound)
  @ApiResponse(CommonResponse.UserNotAuth)
  @ApiResponse(BlogPostResponse.PostIsDraft)
  @ApiParam(BlogPostParam.PostId)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckAuthGuard)
  @UseGuards(CheckPublishedPostGuard)
  public async delLike(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() dto
  ) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blogs}/${postId}/likes`,
      { data: dto }
    );
    return data;
  }

  @Get('posts/:postId/comments')
  @ApiOperation(BlogCommentOperation.Index)
  @ApiResponse(BlogCommentResponse.CommentList)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(BlogPostResponse.PostIsDraft)
  @ApiParam(BlogPostParam.PostId)
  @UseGuards(CheckPublishedPostGuard)
  public async indexComment(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Query() query: BlogCommentQuery,
    @Req() req: Request
  ) {
    const queryString = url.parse(req.url).query;
    const comments = await this.httpService.axiosRef.get<
      PaginationResult<BlogCommentEntity>
    >(`${ApplicationServiceURL.Blogs}/${postId}/comments?${queryString}`, {});

    // Добавляем информацию об авторах комментариев
    // По-хорошему я думаю нужно в сервисе блогов хранить минимальные данные об авторах комментариев
    // и синхронизировать их с сервисом авторизации через RabbitMQ
    for (const commentsEntity of comments.data.entities) {
      try {
        // Получаем информацию об авторе
        const authorResponse =
          await this.httpService.axiosRef.get<BlogUserEntity>(
            `${ApplicationServiceURL.Users}/${commentsEntity.userId}`,
            {}
          );

        // Добавляем информацию об авторе к комментарию
        commentsEntity['user'] = {
          name: authorResponse.data.name,
          email: authorResponse.data.email,
        };
      } catch (error) {
        commentsEntity['user'] = {
          name: '--Not found--',
          email: '--Not found--',
        };
        console.error(
          `Failed to fetch author (id = ${commentsEntity.userId}) for comment ${commentsEntity.id}:`,
          error.data
        );
      }
    }
    return comments.data;
  }

  @Post('posts/:postId/comments')
  @ApiOperation(BlogCommentOperation.AddComment)
  @ApiResponse(BlogCommentResponse.AddComment)
  @ApiResponse(BlogPostResponse.PostNotFound)
  @ApiResponse(CommonResponse.BadRequest)
  @ApiResponse(BlogPostResponse.PostIsDraft)
  @ApiResponse(CommonResponse.UserNotAuth)
  @ApiParam(BlogPostParam.PostId)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckAuthGuard)
  public async addComment(
    @Param(BlogPostParam.PostId.name) postId: string,
    @Body() dto: AddBlogCommentDto
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blogs}/${postId}/comments`,
      dto
    );

    return data;
  }

  @Delete('posts/comments/:commentId')
  @ApiOperation(BlogCommentOperation.DelComment)
  @ApiResponse(BlogCommentResponse.DelComment)
  @ApiResponse(BlogCommentResponse.CommentNotFound)
  @ApiResponse(BlogCommentResponse.NotAllow)
  @ApiResponse(CommonResponse.UserNotAuth)
  @ApiResponse(BlogPostResponse.PostIsDraft)
  @ApiParam(BlogCommentParam.CommentId)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckAuthGuard)
  public async delComment(
    @Param(BlogCommentParam.CommentId.name) commentId: string,
    @Body() body
  ) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blogs}/comments/${commentId}`,
      { data: body }
    );
    return data;
  }
}
