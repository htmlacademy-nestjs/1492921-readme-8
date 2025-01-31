import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BlogPostProperty, UpdatePostDto } from '@project/blog-post';

export class UpdateBlogPostDto extends UpdatePostDto {
  @ApiProperty(BlogPostProperty.PhotoFile.Description)
  @IsOptional()
  public photoFile?: Express.Multer.File;
}
