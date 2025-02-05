import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { AuthenticationProperty } from '../authentication-module/authentication.constant';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
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

  @ApiProperty(AuthenticationProperty.AvatarUrl.Description)
  @IsString()
  @IsOptional()
  public avatarUrl?: string;
}
