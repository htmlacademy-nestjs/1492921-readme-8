import { HttpStatus } from '@nestjs/common';
import { BlogCommentError } from '../blog-comment.constant';
import { BlogCommentWithPaginationRdo } from '../dto/blog-comment-with-pagination.rdo';

export const BlogCommentResponse = {
  AddComment: {
    status: HttpStatus.CREATED,
    description: 'Comment added',
  },
  DelComment: {
    status: HttpStatus.OK,
    description: 'Comment deleted',
  },
  CommentNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: BlogCommentError.CommentNotFound,
  },
  NotAllow: {
    status: HttpStatus.FORBIDDEN,
    description: BlogCommentError.NotAllow,
  },
  CommentList: {
    type: BlogCommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Post list has been received',
  },
} as const;
