import {
  ArrayMaxSize,
  IsArray,
  IsEmpty,
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
import { ImATeapotException } from '@nestjs/common';

export class UpdatePostDto {
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  postType: PostType;

  @IsOptional()
  @IsString()
  repostId?: string;

  //repostAuthorId?: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(8)
  @Length(3, 10, { each: true })
  tags?: string[];

  @IsOptional()
  @IsISO8601()
  publicationDate?: Date;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => [PostType.Video, PostType.Text].includes(o.postType))
  @Length(20, 50)
  name?: string;

  @IsOptional()
  @ValidateIf((o) =>
    [PostType.Video, PostType.Photo, PostType.Link].includes(o.postType)
  )
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.postType === PostType.Text)
  @Length(50, 255)
  preview?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.postType === PostType.Text)
  @Length(100, 1024)
  text?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.postType === PostType.Quote)
  @Length(20, 300)
  quoteText?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.postType === PostType.Quote)
  @Length(3, 50)
  quoteAuthor?: string;
  //quoteAuthorId?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.postType === PostType.Link)
  @Length(1, 300)
  description?: string;
}
