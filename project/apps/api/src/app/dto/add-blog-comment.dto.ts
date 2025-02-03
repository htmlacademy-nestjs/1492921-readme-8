import { OmitType } from '@nestjs/swagger';
import { CreateBlogCommentDto } from '@project/blog-comment';

export class AddBlogCommentDto extends OmitType(CreateBlogCommentDto, [
  'userId',
] as const) {}
