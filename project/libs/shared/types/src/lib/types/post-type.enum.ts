// export enum PostType {
//   Video,
//   Text,
//   Quote,
//   Photo,
//   Link,
// }

export const PostType = {
  Video: 'Video',
  Text: 'Text',
  Quote: 'Quote',
  Photo: 'Photo',
  Link: 'Link',
} as const;

export type PostType = keyof typeof PostType;
