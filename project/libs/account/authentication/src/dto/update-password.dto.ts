import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class UpdatePasswordDto {
  @ApiProperty(AuthenticationProperty.OldPassword.Description)
  @IsString()
  public oldPassword: string;

  @ApiProperty(AuthenticationProperty.NewPassword.Description)
  @IsString()
  @Length(
    AuthenticationProperty.NewPassword.Validate.MinLength,
    AuthenticationProperty.NewPassword.Validate.MaxLength,
    {
      message: AuthenticationProperty.NewPassword.Validate.Message,
    }
  )
  public newPassword: string;
}
