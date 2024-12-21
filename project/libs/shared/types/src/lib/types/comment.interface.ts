export interface Comment {
  id?: string;
  postId: string;
  userId: string;
  createDate?: Date;
  text: string;
}
