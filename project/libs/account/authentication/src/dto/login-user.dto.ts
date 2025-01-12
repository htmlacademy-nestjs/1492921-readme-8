import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({
    description: 'User login or email',
    example: 'user@user.ru',
  })
  @IsString()
  public login: string;
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password: string;
}
