import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';

import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUserError } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly configService: ConfigService
  ) {
    // Извлекаем настройки из конфигурации
    console.log(configService.get<string>('db.host'));
    console.log(configService.get<string>('db.user'));
  }

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

    if (await this.blogUserRepository.findByEmail(email)) {
      throw new ConflictException(AuthUserError.EmailExists);
    }
    if (await this.blogUserRepository.findByLogin(login)) {
      throw new ConflictException(AuthUserError.LoginExists);
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
