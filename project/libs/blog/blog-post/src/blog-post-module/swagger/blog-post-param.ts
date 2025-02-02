//import { CommentProperty } from '@project/blog-comment';
import { BlogPostProperty } from './blog-post-property';

export const BlogPostParam = {
  PostId: {
    name: 'postId',
    type: String,
    schema: BlogPostProperty.Id,
  },
  // UserId: {
  //   name: 'userId',
  //   type: String,
  //   schema: AuthenticationProperty.Id,
  // },
  // CommentId: {
  //   name: 'commentId',
  //   type: String,
  //   schema: CommentProperty.Id,
  // },
} as const;
