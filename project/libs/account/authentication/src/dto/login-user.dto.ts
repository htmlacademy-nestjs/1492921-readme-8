import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({
    description: 'User login or email',
    example: 'user@user.ru',
  })
  @IsOptional()
  @IsString()
  public login?: string;

  @IsOptional()
  @IsString()
  public email?: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password: string;
}
