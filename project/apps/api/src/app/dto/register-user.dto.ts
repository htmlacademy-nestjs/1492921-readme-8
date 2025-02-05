import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { AuthenticationProperty, CreateUserDto } from '@project/authentication';

export class RegisterUserDto extends OmitType(CreateUserDto, [
  'avatarUrl',
] as const) {
  @ApiProperty(AuthenticationProperty.AvatarFile.Description)
  @IsOptional()
  public avatarFile?: Express.Multer.File;
}
