import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  ValidateIf,
} from 'class-validator';

import { PostType } from '@project/shared-types';

export class CreatePostDto {
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  @IsOptional()
  postType?: PostType;

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

  @IsISO8601()
  publicationDate?: Date;

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
