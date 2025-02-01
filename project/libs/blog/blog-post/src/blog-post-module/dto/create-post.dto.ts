import {
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
import { ApiProperty } from '@nestjs/swagger';

import { PostType } from '@project/shared-core';
import { BlogPostProperty } from '../swagger/blog-post-property';

export class CreatePostDto {
  @ApiProperty(BlogPostProperty.PostType.Description)
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty(BlogPostProperty.AuthorId.Description)
  @IsMongoId({ message: BlogPostProperty.AuthorId.Validate.Message })
  authorId!: string;

  @ApiProperty(BlogPostProperty.Tags.Description)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty(BlogPostProperty.Name.Description)
  @ValidateIf((o) => [PostType.Video, PostType.Text].includes(o.postType))
  @IsString()
  @Length(
    BlogPostProperty.Name.Validate.MinLength,
    BlogPostProperty.Name.Validate.MaxLength
  )
  name?: string;

  @ApiProperty(BlogPostProperty.Url.Description)
  @ValidateIf((o) => [PostType.Video, PostType.Link].includes(o.postType))
  @IsUrl()
  url?: string;

  @ApiProperty(BlogPostProperty.Preview.Description)
  @ValidateIf((o) => o.postType === PostType.Text)
  @IsString()
  @Length(
    BlogPostProperty.Preview.Validate.MinLength,
    BlogPostProperty.Preview.Validate.MaxLength
  )
  preview?: string;

  @ApiProperty(BlogPostProperty.Text.Description)
  @ValidateIf((o) => o.postType === PostType.Text)
  @IsString()
  @Length(
    BlogPostProperty.Text.Validate.MinLength,
    BlogPostProperty.Text.Validate.MaxLength
  )
  text?: string;

  @ApiProperty(BlogPostProperty.QuoteText.Description)
  @ValidateIf((o) => o.postType === PostType.Quote)
  @IsString()
  @Length(
    BlogPostProperty.QuoteText.Validate.MinLength,
    BlogPostProperty.QuoteText.Validate.MaxLength
  )
  quoteText?: string;

  @ApiProperty(BlogPostProperty.QuoteAuthor.Description)
  @ValidateIf((o) => o.postType === PostType.Quote)
  @IsString()
  @Length(
    BlogPostProperty.QuoteAuthor.Validate.MinLength,
    BlogPostProperty.QuoteAuthor.Validate.MaxLength
  )
  quoteAuthor?: string;

  @ApiProperty(BlogPostProperty.Description.Description)
  @ValidateIf((o) => o.postType === PostType.Link)
  @IsString()
  @IsOptional()
  @Length(
    BlogPostProperty.Description.Validate.MinLength,
    BlogPostProperty.Description.Validate.MaxLength
  )
  description?: string;
}
