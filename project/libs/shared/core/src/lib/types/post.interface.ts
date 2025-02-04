import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';
//import { Comment } from './comment.interface';

export interface Post {
  id?: string;
  postType: PostType;
  authorId: string;
  isRepost?: boolean; // Избыточно
  repostId?: string;
  repostAuthorId?: string; // Избыточно
  tags?: string[];
  state?: PostState; // Избыточно
  createDate?: Date;
  publicationDate?: Date;
  likesCount?: number; // Избыточно
  commentsCount?: number; // Избыточно
  name?: string;
  url?: string;
  preview?: string;
  text?: string;
  quoteText?: string;
  quoteAuthor?: string;
  description?: string;
  //comments?: Comment[];
}

// export interface BasePost {
//   id?: string;
//   postType: PostType;
//   authorId: string;
//   isRepost: boolean; // Избыточно
//   repostId?: string;
//   repostAuthorId?: string; // Избыточно
//   tags?: string[];
//   state?: PostState; // Избыточно
//   createDate?: Date;
//   publicationDate?: Date;
//   likesCount?: number; // Избыточно
//   commentsCount?: number; // Избыточно
// }

// export interface VideoPost extends BasePost {
//   //postType: PostType.Video;
//   name: string;
//   url: string;
// }

// export interface TextPost extends BasePost {
//   //postType: PostType.Text;
//   name: string;
//   preview: string;
//   text: string;
// }

// export interface QuotePost extends BasePost {
//   //postType: PostType.Quote;
//   quoteAuthorId: string;
//   quoteText: string;
// }

// export interface PhotoPost extends BasePost {
//   // postType: PostType.Photo;
//   url: string;
// }

// export interface LinkPost extends BasePost {
//   //postType: PostType.Link;
//   description: string;
//   url: string;
// }

// //export type Post = TextPost | VideoPost | QuotePost | PhotoPost | LinkPost;

// export interface Post
//   extends VideoPost,
//     TextPost,
//     QuotePost,
//     PhotoPost,
//     LinkPost {}
