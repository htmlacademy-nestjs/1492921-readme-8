import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;
  @ApiProperty({
    description: 'User login',
    example: 'user',
  })
  @Expose()
  public login: string;
  @ApiProperty({
    description: 'User name',
    example: 'Ivan Ivanov',
  })
  @Expose()
  public name: string;
  @ApiProperty({
    description: 'User avatar',
    example: 'https://16.design.htmlacademy.pro/static/avatar/5.jpg',
  })
  @Expose()
  public avatarUrl: string;
  @ApiProperty({
    description: 'User register date (ISO format)',
    example: '2024-10-31T11:54:13.605Z',
  })
  @Expose()
  public registerDate: string;
}
