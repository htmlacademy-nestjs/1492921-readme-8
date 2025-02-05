import { BlogPostProperty } from './blog-post-property';

export const BlogPostParam = {
  PostId: {
    name: 'postId',
    type: String,
    schema: BlogPostProperty.Id,
  },
} as const;
