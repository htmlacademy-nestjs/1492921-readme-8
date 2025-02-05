import { IsArray, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BlogPostProperty } from '@project/blog-post';

export class CreateVideoPostDto {
  @ApiProperty(BlogPostProperty.Name.Description)
  @IsString()
  @Length(
    BlogPostProperty.Name.Validate.MinLength,
    BlogPostProperty.Name.Validate.MaxLength
  )
  name: string;

  @ApiProperty(BlogPostProperty.Url.Description)
  @IsUrl()
  url: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
