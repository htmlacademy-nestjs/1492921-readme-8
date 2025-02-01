import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePhotoPostDto {
  public photoFile: Express.Multer.File;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
