import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MongoIdValidationPipe } from '@project/pipes';
import { fillDto } from '@project/shared-helpers';
import { NotifyService } from '@project/account-notify';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthenticationParam } from './authentication.constant';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { RequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RequestWithTokenPayload } from './request-with-token-payload.interface';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { TokenPayloadRdo } from '../rdo/token-payload.rdo';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdatePassword } from '@project/shared-types';
import { UserRdo } from '../rdo/user.rdo';
import { UserTokenRdo } from '../rdo/user-token.rdo';
import { AuthenticationResponse } from './authentication-response';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {}

  @Post('register')
  @ApiResponse(AuthenticationResponse.UserCreated)
  @ApiResponse(AuthenticationResponse.UserExist)
  @ApiResponse(AuthenticationResponse.BadRequest)
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name });
    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post('change-password')
  @ApiResponse(AuthenticationResponse.PasswordUpdated)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiResponse(AuthenticationResponse.BadRequest)
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  public async updatePassword(
    @Body() dto: UpdatePasswordDto,
    @Req() { user: payload }: RequestWithTokenPayload
  ) {
    const dtoUpdatePassword: UpdatePassword = { ...dto, userId: payload.sub };
    await this.authService.updatePassword(dtoUpdatePassword);
  }

  @Post('login')
  @ApiResponse(AuthenticationResponse.LoggedSuccess)
  @ApiResponse(AuthenticationResponse.LoggedError)
  @ApiResponse(AuthenticationResponse.BadRequest)
  @ApiResponse(AuthenticationResponse.UserNotFound)
  public async login(
    @Body() dto: LoginUserDto,
    @Req() { user }: RequestWithUser
  ) {
    user = await this.authService.verifyUser(dto);
    if (user) {
      const userToken = await this.authService.createUserToken(user);

      return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
    }
  }

  @Get(':userId')
  @ApiResponse(AuthenticationResponse.UserFound)
  @ApiResponse(AuthenticationResponse.UserNotFound)
  @ApiResponse(AuthenticationResponse.BadRequest)
  @ApiParam(AuthenticationParam.UserId)
  public async show(
    @Param(AuthenticationParam.UserId.name, MongoIdValidationPipe)
    userId: string
  ) {
    const existUser = await this.authService.getUserById(userId);
    return fillDto(UserRdo, existUser.toPOJO());
  }

  @Post('refresh')
  @ApiResponse(AuthenticationResponse.GetTokens)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiBearerAuth('refreshToken')
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return fillDto(UserTokenRdo, this.authService.createUserToken(user));
  }

  @Post('check')
  @ApiResponse(AuthenticationResponse.CheckSuccess)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return fillDto(TokenPayloadRdo, payload);
  }
}
