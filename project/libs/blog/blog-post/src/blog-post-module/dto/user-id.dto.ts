import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

import { BlogPostProperty } from '../swagger/blog-post-property';

export class UserIdDto {
  @ApiProperty(BlogPostProperty.UserId.Description)
  @IsMongoId({ message: BlogPostProperty.UserId.Validate.Message })
  userId: string;
}
