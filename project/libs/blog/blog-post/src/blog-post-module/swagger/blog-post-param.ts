//import { CommentProperty } from '@project/blog-comment';
import { BlogPostProperty } from './blog-post-property';

export const BlogPostParam = {
  // UserId: {
  //   name: 'userId',
  //   type: String,
  //   schema: AuthenticationProperty.Id,
  // },
  PostId: {
    name: 'postId',
    type: String,
    schema: BlogPostProperty.Id,
  },
  // CommentId: {
  //   name: 'commentId',
  //   type: String,
  //   schema: CommentProperty.Id,
  // },
} as const;
