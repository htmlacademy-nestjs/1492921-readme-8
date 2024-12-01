import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';

export interface BasePost {
  id?: string;
  postType: PostType;
  authorId: string;
  isRepost: boolean; // Избыточно
  repostId?: string;
  repostAuthorId?: string; // Избыточно
  tags?: string[];
  state: PostState; // Избыточно
  createDate: Date;
  publicationDate: Date;
  likesCount: number; // Избыточно
  commentsCount: number; // Избыточно
}

export interface VideoPost extends BasePost {
  name: string;
  url: string;
}

export interface TextPost extends BasePost {
  name: string;
  preview: string;
  text: string;
}

export interface QuotePost extends BasePost {
  quoteAuthorId: string;
  quoteText: string;
}

export interface PhotoPost extends BasePost {
  url: string;
}

export interface LinkPost extends BasePost {
  description: string;
  url: string;
}

export interface Post
  extends VideoPost,
    TextPost,
    QuotePost,
    PhotoPost,
    LinkPost {}
