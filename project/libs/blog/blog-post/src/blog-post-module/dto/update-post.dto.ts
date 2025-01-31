import {
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

import { ApiProperty } from '@nestjs/swagger';
import { BlogPostProperty } from '../swagger/blog-post-property';

export class UpdatePostDto {
  @ApiProperty(BlogPostProperty.PostType.Description)
  @IsIn(Object.values(PostType))
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty(BlogPostProperty.RepostId.Description)
  @IsOptional()
  @IsString()
  repostId?: string;

  @ApiProperty(BlogPostProperty.Tags.Description)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty(BlogPostProperty.PublicationDate.Description)
  @IsOptional()
  @IsISO8601()
  publicationDate?: Date;

  @ApiProperty(BlogPostProperty.Name.Description)
  @IsOptional()
  @ValidateIf((o) => [PostType.Video, PostType.Text].includes(o.postType))
  @IsString()
  @Length(
    BlogPostProperty.Name.Validate.MinLength,
    BlogPostProperty.Name.Validate.MaxLength
  )
  name?: string;

  @ApiProperty(BlogPostProperty.Url.Description)
  @IsOptional()
  @ValidateIf((o) => [PostType.Video, PostType.Link].includes(o.postType))
  @IsUrl()
  url?: string;

  @ApiProperty(BlogPostProperty.Preview.Description)
  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.Text)
  @IsString()
  @Length(
    BlogPostProperty.Preview.Validate.MinLength,
    BlogPostProperty.Preview.Validate.MaxLength
  )
  preview?: string;

  @ApiProperty(BlogPostProperty.Text.Description)
  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.Text)
  @IsString()
  @Length(
    BlogPostProperty.Text.Validate.MinLength,
    BlogPostProperty.Text.Validate.MaxLength
  )
  text?: string;

  @ApiProperty(BlogPostProperty.QuoteText.Description)
  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.Quote)
  @IsString()
  @Length(
    BlogPostProperty.QuoteText.Validate.MinLength,
    BlogPostProperty.QuoteText.Validate.MaxLength
  )
  quoteText?: string;

  @ApiProperty(BlogPostProperty.QuoteAuthor.Description)
  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.Quote)
  @IsString()
  @Length(
    BlogPostProperty.QuoteAuthor.Validate.MinLength,
    BlogPostProperty.QuoteAuthor.Validate.MaxLength
  )
  quoteAuthor?: string;

  @ApiProperty(BlogPostProperty.Description.Description)
  @IsOptional()
  @ValidateIf((o) => o.postType === PostType.Link)
  @IsString()
  @Length(BlogPostProperty.Description.Validate.MaxLength)
  description?: string;
}
