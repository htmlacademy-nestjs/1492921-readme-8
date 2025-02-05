import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class LoggedUserRdo {
  @ApiProperty(AuthenticationProperty.Id.Description)
  @Expose()
  public id: string;

  @ApiProperty(AuthenticationProperty.Email.Description)
  @Expose()
  public email: string;

  @ApiProperty(AuthenticationProperty.AccessToken.Description)
  @Expose()
  public accessToken: string;

  @ApiProperty(AuthenticationProperty.RefreshToken.Description)
  @Expose()
  public refreshToken: string;
}
