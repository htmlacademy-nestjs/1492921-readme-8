export const SortDirection = {
  Desc: 'desc',
  Asc: 'asc',
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];
