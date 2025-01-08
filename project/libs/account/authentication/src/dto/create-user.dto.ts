import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl, ValidateIf } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';
import { Optional } from '@nestjs/common';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email: string;
  @ApiProperty({
    description: 'User login',
    example: 'user',
  })
  @IsString()
  public login?: string;
  @ApiProperty({
    description: 'User name',
    example: 'Ivan Ivanov',
  })
  @IsString()
  public name?: string;
  @ApiProperty({
    description: 'User avatar',
    example: 'https://16.design.htmlacademy.pro/static/avatar/5.jpg',
  })
  @ValidateIf((o) => o.avatarUrl)
  @IsUrl()
  public avatarUrl?: string;
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password: string;
}
