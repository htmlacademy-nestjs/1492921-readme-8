import { HttpStatus } from '@nestjs/common';
import { BlogLikeError } from '../blog-like.constant';

export const BlogLikeResponse = {
  SetLike: {
    status: HttpStatus.OK,
    description: 'Post liked',
  },
  DelLike: {
    status: HttpStatus.OK,
    description: 'Like deleted',
  },
  LikeExists: {
    status: HttpStatus.CONFLICT,
    description: BlogLikeError.LikeExists,
  },
  LikeNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: BlogLikeError.LikeNotFound,
  },
} as const;
