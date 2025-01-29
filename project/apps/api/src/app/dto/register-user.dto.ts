import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

import { AuthenticationProperty, LoginUserDto } from '@project/authentication';

export class RegisterUserDto extends LoginUserDto {
  @ApiProperty(AuthenticationProperty.Name.Description)
  @IsString()
  @Length(
    AuthenticationProperty.Name.Validate.MinLength,
    AuthenticationProperty.Name.Validate.MaxLength,
    {
      message: AuthenticationProperty.Name.Validate.Message,
    }
  )
  public name: string;

  @ApiProperty(AuthenticationProperty.AvatarFile.Description)
  @IsOptional()
  public avatarFile?: Express.Multer.File;
}
