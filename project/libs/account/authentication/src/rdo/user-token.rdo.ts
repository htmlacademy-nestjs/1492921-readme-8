import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class UserTokenRdo {
  @ApiProperty(AuthenticationProperty.AccessToken.Description)
  @Expose()
  public accessToken: string;

  @ApiProperty(AuthenticationProperty.RefreshToken.Description)
  @Expose()
  public refreshToken: string;
}
