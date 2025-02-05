import { OmitType } from '@nestjs/swagger';

import { BlogPostQuery } from '@project/blog-post';

export class ApiBlogPostQuery extends OmitType(BlogPostQuery, [
  'userId',
] as const) {}
