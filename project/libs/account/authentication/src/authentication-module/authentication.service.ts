import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import dayjs from 'dayjs';

import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUserError } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, login, name, avatarUrl, password } = dto;

    const blogUser = {
      email,
      login,
      name,
      avatarUrl,
      registerDate: dayjs().toDate(),
      passwordHash: '',
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUserError.UserExists);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserError.UserNotFound);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AuthUserError.PasswordWrong);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthUserError.UserNotFound);
    }

    return user;
  }
}
