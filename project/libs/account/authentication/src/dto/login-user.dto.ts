import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

import { AuthenticationProperty } from '../authentication-module/authentication.constant';
export class LoginUserDto {
  @ApiProperty(AuthenticationProperty.Email.Description)
  @IsString()
  @IsEmail({}, { message: AuthenticationProperty.Email.Validate.Message })
  public email: string;

  @ApiProperty(AuthenticationProperty.Password.Description)
  @IsString()
  @Length(
    AuthenticationProperty.Password.Validate.MinLength,
    AuthenticationProperty.Password.Validate.MaxLength,
    {
      message: AuthenticationProperty.Password.Validate.Message,
    }
  )
  public password: string;
}
