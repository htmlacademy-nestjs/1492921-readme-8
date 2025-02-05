import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BlogPostProperty, CreatePostDto } from '@project/blog-post';

export class CreateBlogPostDto extends CreatePostDto {
  @ApiProperty(BlogPostProperty.PhotoFile.Description)
  @IsOptional()
  public photoFile?: Express.Multer.File;
}
