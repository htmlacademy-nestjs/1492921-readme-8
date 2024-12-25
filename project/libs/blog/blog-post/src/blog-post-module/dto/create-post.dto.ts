import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  ValidateIf,
} from 'class-validator';

import { PostType } from '@project/shared-types';

// import { CreateLinkPostDto } from './create-link-post.dto';
// import { CreatePhotoPostDto } from './create-photo-post.dto';
// import { CreateQuotePostDto } from './create-quote-post.dto';
// import { CreateTextPostDto } from './create-text-post.dto';
// import { CreateVideoPostDto } from './create-video-post.dto';

// type CreateAllPostDto =
//   | CreateVideoPostDto
//   | CreateTextPostDto
//   | CreateQuotePostDto
//   | CreatePhotoPostDto
//   | CreateLinkPostDto;

// export type CreatePostDto = {
//   postType: PostType;
//   post: CreateAllPostDto;
// };

export class CreatePostDto {
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  postType: PostType;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  authorId: string;

  @IsString()
  @IsOptional()
  repostId?: string;

  //repostAuthorId?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @ArrayMaxSize(8)
  @Length(3, 10, { each: true })
  tags?: string[];

  @IsString()
  @IsOptional()
  @Length(20, 50)
  @ValidateIf((o) => [PostType.Video, PostType.Text].includes(o.postType))
  name?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ValidateIf((o) =>
    [PostType.Video, PostType.Photo, PostType.Link].includes(o.postType)
  )
  url?: string;

  @IsString()
  @IsOptional()
  @Length(50, 255)
  @ValidateIf((o) => o.postType === PostType.Text)
  preview?: string;

  @IsString()
  @IsOptional()
  @Length(100, 1024)
  @ValidateIf((o) => o.postType === PostType.Text)
  text?: string;

  @IsString()
  @IsOptional()
  @Length(20, 300)
  @ValidateIf((o) => o.postType === PostType.Quote)
  quoteText?: string;

  @IsString()
  @IsOptional()
  @Length(3, 50)
  @ValidateIf((o) => o.postType === PostType.Quote)
  quoteAuthor?: string;
  //quoteAuthorId?: string;

  @IsString()
  @IsOptional()
  @Length(1, 300)
  @ValidateIf((o) => o.postType === PostType.Link)
  description?: string;
}
