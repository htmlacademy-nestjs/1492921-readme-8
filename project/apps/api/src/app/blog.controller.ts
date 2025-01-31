import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InjectUserIdInterceptor } from '@project/interceptors';
import FormData from 'form-data';

import {
  BlogPostBody,
  BlogPostError,
  BlogPostOperation,
  BlogPostParam,
  BlogPostProperty,
  BlogPostResponse,
} from '@project/blog-post';
import {
  BlogLikeOperationMessage,
  BlogLikeResponseMessage,
} from '@project/blog-like';
import { AuthenticationResponse } from '@project/authentication';
import {
  ImageFileInterceptor,
  multerFileToFormData,
} from '@project/shared-helpers';
import { UploadedFileRdo } from '@project/file-uploader';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { CheckPublishedPostGuard } from './guards/check-published-post.guard ';
import { CheckMyPostGuard } from './guards/check-my-post.guard';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { ApiBlogPostBody } from './swagger/api-blog-post-request';

@ApiTags('Blogs')
@Controller('blogs')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @Post('posts')
  @ApiOperation(BlogPostOperation.Create)
  @ApiResponse(BlogPostResponse.PostCreated)
  @ApiResponse(BlogPostResponse.BadRequest)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiBody(ApiBlogPostBody.create)
  @ApiBearerAuth('accessToken')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(
    ImageFileInterceptor(BlogPostProperty.PhotoFile.Validate, 'photoFile')
  )
  @UseGuards(CheckAuthGuard)
  public async create(
    @Body() dto: CreateBlogPostDto,
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
    const post = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blogs}/`,
      { ...dto, authorId: dto['userId'] }
    );
    return post.data;
  }

  @Patch('posts/:postId')
  @ApiOperation(BlogPostOperation.Update)
  @ApiResponse(BlogPostResponse.PostUpdated)
  @ApiResponse(BlogPostResponse.BadRequest)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiBody(BlogPostBody.update)
  @ApiBearerAuth('accessToken')
  @ApiConsumes('multipart/form-data')
  @ApiParam(BlogPostParam.PostId)
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(
    ImageFileInterceptor(BlogPostProperty.PhotoFile.Validate, 'photoFile')
  )
  @UseGuards(CheckMyPostGuard)
  public async update(
    @Param('postId') postId: string,
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
  @ApiBearerAuth('accessToken')
  @ApiParam(BlogPostParam.PostId)
  @HttpCode(BlogPostResponse.PostDeleted.status)
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckMyPostGuard)
  public async delete(@Param('postId') postId: string) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blogs}/${postId}`,
      null
    );
    return data;
  }

  @Post('posts/:postId/likes')
  @ApiOperation({ summary: BlogLikeOperationMessage.SetLike })
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
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: BlogLikeResponseMessage.LikeExists,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: BlogPostError.PostIsDraft,
  })
  @HttpCode(HttpStatus.OK)
  public async addLike(@Param('postId') postId: string, @Body() body) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blogs}/${postId}/likes`,
      body
    );

    return data;
  }
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseGuards(CheckAuthGuard)
  @UseGuards(CheckPublishedPostGuard)

  @Delete('posts/:postId/likes')
  @ApiOperation({ summary: BlogLikeOperationMessage.DelLike })
  @UseGuards(CheckAuthGuard)
  @UseGuards(CheckPublishedPostGuard)
  @ApiBearerAuth('accessToken')
  @UseInterceptors(UseInterceptors)
  @UseInterceptors(InjectUserIdInterceptor)
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogLikeResponseMessage.LikeNotFound,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteLike(@Param('postId') postId: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blogs}/${postId}/likes`,
      { data: dto }
    );
    return data;
  }
}
