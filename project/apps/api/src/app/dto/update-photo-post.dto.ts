import { IsArray, IsEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostProperty } from '@project/blog-post';
import { Transform } from 'class-transformer';

export class UpdatePhotoPostDto {
  @IsOptional()
  public photoFile: Express.Multer.File;

  @ApiProperty(BlogPostProperty.PublicationDate.Description)
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsOptional()
  publicationDate?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
