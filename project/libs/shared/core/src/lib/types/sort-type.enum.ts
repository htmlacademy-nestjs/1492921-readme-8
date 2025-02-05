export const SortType = {
  PublicationDate: 'publicationDate',
  CreateDate: 'createDate',
  Comments: 'commentsCount',
  Likes: 'likesCount',
} as const;

export type SortType = (typeof SortType)[keyof typeof SortType];
