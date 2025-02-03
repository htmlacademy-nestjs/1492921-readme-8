export const BlogCommentProperty = {
  Id: {
    Description: {
      description: 'The unique comment ID',
      example: '2f31b19b-97eb-4305-877a-0b9be7faca8f',
    },
  },
  Text: {
    Description: {
      description: 'Text post comment',
      required: true,
      example: 'Text comment',
    },
    Validate: {
      MinLength: 10,
      MaxLength: 300,
      Message:
        'The text comment be at least 10 and no more than 300 characters long',
    },
  },
  CommentList: {
    Description: {
      description: 'Comment list',
      example: '[{commentObject1}, {commentObject2}]',
      isArray: true,
    },
  },
} as const;
