import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { BlogCommentValidateMessage } from '../blog-comment.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.MessageIsEmpty })
  public text: string;

  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidID })
  public userId: string;
}
