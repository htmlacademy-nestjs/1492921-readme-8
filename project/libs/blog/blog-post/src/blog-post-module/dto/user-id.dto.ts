import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

import { CommonProperty } from '@project/shared-core';

export class UserIdDto {
  @ApiProperty(CommonProperty.UserIdNotNull.Description)
  @IsMongoId()
  userId: string;
}
