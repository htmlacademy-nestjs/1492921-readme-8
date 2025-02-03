export const BlogCommentPaginationDefault = {
  PostCountLimit: 50,
  PageCurrent: 1,
} as const;

export const BlogCommentError = {
  CommentNotFound: 'Comment not found',
  NotAllow: 'Comment is not yours',
} as const;
