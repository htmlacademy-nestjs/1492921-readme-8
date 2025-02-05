import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class UserRdo {
  @ApiProperty(AuthenticationProperty.Id.Description)
  @Expose()
  public id: string;

  @ApiProperty(AuthenticationProperty.Email.Description)
  @Expose()
  public email: string;

  @ApiProperty(AuthenticationProperty.Name.Description)
  @Expose()
  public name: string;

  @ApiProperty(AuthenticationProperty.AvatarUrl.Description)
  @Expose()
  public avatarUrl: string;

  @ApiProperty(AuthenticationProperty.RegisterDate.Description)
  @Expose()
  public registerDate: string;

  @ApiProperty(AuthenticationProperty.PostsCount.Description)
  @Expose()
  public postsCount: string;

  @ApiProperty(AuthenticationProperty.SubscribersCount.Description)
  @Expose()
  public subscribersCount: string;
}
