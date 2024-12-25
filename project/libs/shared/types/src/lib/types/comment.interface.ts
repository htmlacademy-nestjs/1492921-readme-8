export interface Comment {
  id?: string;
  postId: string;
  userId: string;
  text: string;
  createDate: Date;
}
