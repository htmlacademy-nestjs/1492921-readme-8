import { PostType } from '@project/shared-types';

// import { CreateLinkPostDto } from './create-link-post.dto';
// import { CreatePhotoPostDto } from './create-photo-post.dto';
// import { CreateQuotePostDto } from './create-quote-post.dto';
// import { CreateTextPostDto } from './create-text-post.dto';
// import { CreateVideoPostDto } from './create-video-post.dto';

// type CreateAllPostDto =
//   | CreateVideoPostDto
//   | CreateTextPostDto
//   | CreateQuotePostDto
//   | CreatePhotoPostDto
//   | CreateLinkPostDto;

// export type CreatePostDto = {
//   postType: PostType;
//   post: CreateAllPostDto;
// };

export type CreatePostDto = {
  postType: PostType;
  authorId: string;
  repostId?: string;
  repostAuthorId?: string;
  tags?: string[];
  name?: string;
  url?: string;
  preview?: string;
  text?: string;
  quoteAuthorId?: string;
  quoteText?: string;
  description?: string;
};
