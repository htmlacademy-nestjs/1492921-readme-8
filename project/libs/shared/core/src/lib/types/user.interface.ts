export interface User {
  id?: string;
  email: string;
  name: string;
  avatarUrl?: string;
  registerDate?: Date;
  postsCount: number;
  subscribersCount: number;
}
