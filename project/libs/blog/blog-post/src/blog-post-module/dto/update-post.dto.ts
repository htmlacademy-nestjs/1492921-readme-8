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
  @ValidateIf((o) => [PostType.Video, PostType.Text].includes(o.postType))
  @IsString()
  @Length(20, 50)
  name?: string;

  @IsOptional()
  @ValidateIf((o) =>
    [PostType.Video, PostType.Photo, PostType.Link].includes(o.postType)
  )
  @IsUrl()
  url?: string;

  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.Text)
  @IsString()
  @Length(50, 255)
  preview?: string;

  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.Text)
  @IsString()
  @Length(100, 1024)
  text?: string;

  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.Quote)
  @IsString()
  @Length(20, 300)
  quoteText?: string;

  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.Quote)
  @IsString()
  @Length(3, 50)
  quoteAuthor?: string;

  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.Link)
  @IsString()
  @Length(1, 300)
  description?: string;
}
