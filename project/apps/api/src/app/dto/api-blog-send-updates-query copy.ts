import { OmitType } from '@nestjs/swagger';

import { BlogSendUpdatesQuery } from '@project/blog-post';

export class ApiBlogSendUpdatesQuery extends OmitType(BlogSendUpdatesQuery, [
  'startDate',
] as const) {}
