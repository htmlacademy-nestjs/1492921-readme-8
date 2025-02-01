import { HttpStatus } from '@nestjs/common';

import { BlogPostRdo } from '../rdo/blog-post.rdo';
import { BlogPostError } from '../blog-post.constant';
import { BlogPostWithPaginationRdo } from '../rdo/blog-post-with-pagination.rdo';

export const BlogPostResponse = {
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  },
  PostCreated: {
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created',
  },
  PostUpdated: {
    type: BlogPostRdo,
    status: HttpStatus.OK,
    description: 'The post has been successfully updated',
  },
  PostDeleted: {
    status: HttpStatus.OK,
    description: 'The post has been successfully deleted',
  },
  UserNotAuth: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not Auth',
  },
  PostFound: {
    type: BlogPostRdo,
    status: HttpStatus.OK,
    description: 'Post found',
  },
  PostNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: BlogPostError.PostNotFound,
  },
  PostReposted: {
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: 'The post has been successfully reposted',
  },
  AlreadyReposted: {
    status: HttpStatus.CONFLICT,
    description: BlogPostError.RepostExist,
  },
  PostsList: {
    type: BlogPostWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Post list has been received',
  },

  NotAllow: {
    status: HttpStatus.FORBIDDEN,
    description: BlogPostError.NotAllow,
  },

  // SearchPosts: {
  //   type: PostWithUserIdRdo,
  //   isArray: true,
  //   status: HttpStatus.OK,
  //   description: 'Posts found.',
  // },

  // UserPostsCount: {
  //   type: UserPostsCountRdo,
  //   status: HttpStatus.OK,
  //   description: 'User posts count.',
  // },
} as const;
