import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({
    description: 'User login',
    example: 'user@user.ru',
  })
  @IsOptional()
  @IsString()
  public login: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password: string;
}
