import { SortDirection } from '@project/shared-types';

export const BlogPostError = {
  PostNotFound: 'Post not found',
} as const;

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;
