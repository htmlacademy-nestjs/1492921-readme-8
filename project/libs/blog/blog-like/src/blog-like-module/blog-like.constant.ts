export const BlogLikeResponseMessage = {
  SetLike: 'Post liked',
  DelLike: 'Like deleted',
  Unauthorized: 'Need authorization',
  PostNotFound: 'postId not found',
  LikeExists: 'User has already liked this post',
  LikeNotFound: 'User not liked this post',
} as const;

export const BlogLikeOperationMessage = {
  SetLike: 'Set user like on the post',
  DelLike: 'Unset user like on the post',
} as const;
