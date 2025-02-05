import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export interface Post {
  id?: string;
  postType: PostType;
  authorId: string;
  isRepost?: boolean;
  repostId?: string;
  repostAuthorId?: string;
  tags?: string[];
  state?: PostState;
  createDate?: Date;
  publicationDate?: Date;
  likesCount?: number;
  commentsCount?: number;
  name?: string;
  url?: string;
  preview?: string;
  text?: string;
  quoteText?: string;
  quoteAuthor?: string;
  description?: string;
}
