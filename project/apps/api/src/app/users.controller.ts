import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import FormData from 'form-data';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  AuthenticationParam,
  AuthenticationResponse,
  AuthenticationProperty,
  LoginUserDto,
  UpdatePasswordDto,
  AuthenticationOperation,
} from '@project/authentication';
import { multerFileToFormData } from '@project/shared-helpers';
import { UploadedFileRdo } from '@project/file-uploader';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckNoAuthGuard } from './guards/check-no-auth.guard.';
import { RegisterUserDto } from './dto/register-user.dto';
import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags('Users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post('register')
  @ApiOperation(AuthenticationOperation.Register)
  @ApiResponse(AuthenticationResponse.UserCreated)
  @ApiResponse(AuthenticationResponse.UserExist)
  @ApiResponse(AuthenticationResponse.BadRequest)
  @ApiResponse(AuthenticationResponse.UserAuthForbidden)
  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckNoAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatarFile', {
      fileFilter: (request, file, callback) => {
        if (
          !file.originalname.match(
            AuthenticationProperty.AvatarFile.Validate.FileExtRegExp
          )
        ) {
          return callback(
            new ForbiddenException(
              AuthenticationProperty.AvatarFile.Validate.Message
            ),
            false
          );
        }
        callback(null, true);
      },
      limits: { fileSize: AuthenticationProperty.AvatarFile.Validate.MaxSize },
    })
  )
  public async create(
    @Body() dto: RegisterUserDto,
    @UploadedFile() avatarFile?: Express.Multer.File
  ) {
    const form = new FormData();

    if (avatarFile) {
      multerFileToFormData(form, avatarFile, 'file');
    }

    const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(
      `${ApplicationServiceURL.Files}/upload`,
      form
    );

    const user = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/register`,
      {
        ...dto,
        avatarUrl: `${data.subDirectory}/${data.hashName}`,
      }
    );
    return user.data;
  }

  @Post('change-password')
  @ApiOperation(AuthenticationOperation.ChangePassword)
  @ApiResponse(AuthenticationResponse.PasswordUpdated)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiResponse(AuthenticationResponse.BadRequest)
  @ApiBearerAuth('accessToken')
  @UseGuards(CheckAuthGuard)
  public async updatePassword(
    @Body() dto: UpdatePasswordDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/change-password`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @Post('login')
  @ApiOperation(AuthenticationOperation.Login)
  @ApiResponse(AuthenticationResponse.LoggedSuccess)
  @ApiResponse(AuthenticationResponse.LoggedError)
  @ApiResponse(AuthenticationResponse.BadRequest)
  @ApiResponse(AuthenticationResponse.UserNotFound)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto
    );
    return data;
  }

  @Get(':userId')
  @ApiOperation(AuthenticationOperation.GetUser)
  @ApiResponse(AuthenticationResponse.UserFound)
  @ApiResponse(AuthenticationResponse.UserNotFound)
  @ApiResponse(AuthenticationResponse.BadRequest)
  @ApiParam(AuthenticationParam.UserId)
  public async show(@Param('userId') userId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${userId}`,
      null
    );
    return data;
  }

  @Post('refresh')
  @ApiOperation(AuthenticationOperation.RefreshTokens)
  @ApiResponse(AuthenticationResponse.GetTokens)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiBearerAuth('refreshToken')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @Post('check')
  @ApiOperation(AuthenticationOperation.Check)
  @ApiResponse(AuthenticationResponse.CheckSuccess)
  @ApiResponse(AuthenticationResponse.UserNotAuth)
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  public async checkAuth(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/check`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }
}
