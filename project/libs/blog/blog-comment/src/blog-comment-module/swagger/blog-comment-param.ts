import { BlogCommentProperty } from './blog-comment-property';

export const BlogCommentParam = {
  CommentId: {
    name: 'commentId',
    type: String,
    schema: BlogCommentProperty.Id,
  },
} as const;
