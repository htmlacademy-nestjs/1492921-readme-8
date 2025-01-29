import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { AuthenticationProperty } from '../authentication-module/authentication.constant';

export class TokenPayloadRdo {
  @ApiProperty(AuthenticationProperty.Id.Description)
  @Expose()
  public sub: string;

  @ApiProperty(AuthenticationProperty.Email.Description)
  @Expose()
  public email: string;

  @ApiProperty(AuthenticationProperty.Name.Description)
  @Expose()
  public name: string;
}
