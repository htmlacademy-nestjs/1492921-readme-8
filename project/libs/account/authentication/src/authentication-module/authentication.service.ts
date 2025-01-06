import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthUserError } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { Token, TokenPayload, User } from '@project/shared-types';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, login, name, avatarUrl, password } = dto;

    const blogUser = {
      email,
      login,
      name,
      avatarUrl,
      passwordHash: '',
    };

    if (await this.blogUserRepository.findByEmail(email)) {
      throw new ConflictException(AuthUserError.EmailExists);
    }
    if (await this.blogUserRepository.findByLogin(login)) {
      throw new ConflictException(AuthUserError.LoginExists);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    return await this.blogUserRepository.save(userEntity);
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

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      login: user.login,
      name: user.name,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
