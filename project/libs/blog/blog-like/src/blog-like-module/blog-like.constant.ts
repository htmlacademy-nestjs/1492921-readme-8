export const BlogLikeResponseMessage = {
  SetLike: 'Post liked',
  DelLike: 'Like deleted',
  Unauthorized: 'Need authorization', // Позже уйдет в гарды
  PostNotFound: 'PostId not found', // Позже уйдет в гарды
  LikeExists: 'User has already liked this post',
  LikeNotFound: 'User not liked this post',
  PostIsDraft: 'Post state is not is published',
} as const;

export const BlogLikeValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidID: 'Invalid author id',
} as const;
