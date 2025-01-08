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
  @ValidateIf((o) => [PostType.Video, PostType.Text].includes(o.postType))
  @Length(20, 50)
  name?: string;

  @IsString()
  @ValidateIf((o) =>
    [PostType.Video, PostType.Photo, PostType.Link].includes(o.postType)
  )
  @IsNotEmpty()
  @IsUrl()
  url?: string;

  @IsString()
  @ValidateIf((o) => o.postType === PostType.Text)
  @Length(50, 255)
  preview?: string;

  @IsString()
  @ValidateIf((o) => o.postType === PostType.Text)
  @Length(100, 1024)
  text?: string;

  @IsString()
  @ValidateIf((o) => o.postType === PostType.Quote)
  @Length(20, 300)
  quoteText?: string;

  @IsString()
  @ValidateIf((o) => o.postType === PostType.Quote)
  @Length(3, 50)
  quoteAuthor?: string;
  //quoteAuthorId?: string;

  @IsString()
  @ValidateIf((o) => o.postType === PostType.Link)
  @Length(1, 300)
  description?: string;
}
