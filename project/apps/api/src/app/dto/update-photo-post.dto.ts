import {
  IsArray,
  IsEmpty,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostProperty } from '@project/blog-post';

export class UpdatePhotoPostDto {
  @IsOptional()
  public photoFile: Express.Multer.File;

  @ApiProperty(BlogPostProperty.PublicationDate.Description)
  @IsOptional()
  publicationDate?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
