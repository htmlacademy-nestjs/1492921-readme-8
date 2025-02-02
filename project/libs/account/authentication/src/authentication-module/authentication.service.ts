import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { AuthUser, Token, UpdatePassword, User } from '@project/shared-core';
import { jwtConfig } from '@project/account-config';
import { createJWTPayload, fillDto } from '@project/shared-helpers';

import { CreateUserDto } from '../dto/create-user.dto';
import { AuthenticationMessage } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { AuthenticationResponse } from './authentication-response';
import { UserRdo } from '../rdo/user.rdo';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, name, avatarUrl, password } = dto;

    const blogUser: AuthUser = {
      email,
      name,
      avatarUrl,
      passwordHash: '',
      postsCount: 0,
      subscribersCount: 0,
    };

    if (await this.blogUserRepository.findByEmail(email)) {
      throw new ConflictException(AuthenticationMessage.EmailExists);
    }
    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    return await this.blogUserRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);
    if (!existUser) {
      throw new NotFoundException(AuthenticationMessage.UserNotFound);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AuthenticationMessage.PasswordWrong);
    }
    return existUser;
  }

  public async getUserById(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthenticationMessage.UserNotFound);
    }

    return user;
  }

  public async getUserByEmail(email: string) {
    const user = await this.blogUserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(AuthenticationMessage.UserNotFound);
    }

    return user;
  }

  public async updatePassword(dto: UpdatePassword) {
    if (!dto.userId) {
      throw new UnauthorizedException(
        AuthenticationResponse.UserNotAuth.description
      );
    }
    const existUser = await this.blogUserRepository.findById(dto.userId);
    if (!existUser) {
      throw new NotFoundException(
        AuthenticationResponse.UserNotFound.description
      );
    }
    const login: LoginUserDto = {
      email: existUser.email,
      password: dto.oldPassword,
    };
    if (await this.verifyUser(login)) {
      const userEntity = await existUser.setPassword(dto.newPassword);
      this.blogUserRepository.update(userEntity);
      return userEntity;
    }
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        }
      );
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
