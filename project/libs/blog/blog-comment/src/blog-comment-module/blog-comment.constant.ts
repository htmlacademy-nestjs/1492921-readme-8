export const MAX_COMMENTS_COUNT = 50;

export const BlogCommentValidateMessage = {
  MessageIsEmpty: 'The message is empty',
  InvalidID: 'Invalid author id',
} as const;

export const CommentProperty = {
  Id: {
    Description: {
      description: 'The unique comment ID',
      example: '2f31b19b-97eb-4305-877a-0b9be7faca8f',
    },
  },
} as const;
