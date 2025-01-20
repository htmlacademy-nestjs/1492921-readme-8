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

export class CreatePostDto {
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  postType: PostType;

  @IsOptional()
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  authorId!: string;

  @IsOptional()
  @IsString()
  repostId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(8)
  @Length(3, 10, { each: true })
  tags?: string[];

  @ValidateIf((o) => [PostType.Video, PostType.Text].includes(o.postType))
  @IsString()
  @Length(20, 50)
  name?: string;

  @ValidateIf((o) =>
    [PostType.Video, PostType.Photo, PostType.Link].includes(o.postType)
  )
  @IsUrl()
  url?: string;

  @ValidateIf((o) => o.postType === PostType.Text)
  @IsString()
  @Length(50, 255)
  preview?: string;

  @ValidateIf((o) => o.postType === PostType.Text)
  @IsString()
  @Length(100, 1024)
  text?: string;

  @ValidateIf((o) => o.postType === PostType.Quote)
  @IsString()
  @Length(20, 300)
  quoteText?: string;

  @ValidateIf((o) => o.postType === PostType.Quote)
  @IsString()
  @Length(3, 50)
  quoteAuthor?: string;

  @ValidateIf((o) => o.postType === PostType.Link)
  @IsString()
  @Length(1, 300)
  description?: string;
}
