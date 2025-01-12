import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
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
    description: 'User token',
    example: 'eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODEzNTcwMzl9',
  })
  @Expose()
  public accessToken: string;
  @ApiProperty({
    description: 'Refresh token',
  })
  @Expose()
  public refreshToken: string;
}
