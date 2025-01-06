// export enum PostState {
//   Published = 'published',
//   Draft = 'draft',
// }

export const PostState = {
  Published: 'published',
  Draft: 'draft',
} as const;

export type PostState = (typeof PostState)[keyof typeof PostState];
