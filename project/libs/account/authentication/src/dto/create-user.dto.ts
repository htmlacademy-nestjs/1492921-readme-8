import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru',
  })
  public email: string;
  @ApiProperty({
    description: 'User login',
    example: 'user',
  })
  public login?: string;
  @ApiProperty({
    description: 'User name',
    example: 'Ivan Ivanov',
  })
  public name?: string;
  @ApiProperty({
    description: 'User avatar',
    example: 'https://16.design.htmlacademy.pro/static/avatar/5.jpg',
  })
  public avatarUrl?: string;
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;
}
