import 'multer';
import { Express } from 'express';
import FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { MongoIdValidationPipe } from '@project/pipes';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
@UseFilters(AxiosExceptionFilter)
export class FilesController {
  constructor(private readonly httpService: HttpService) {}

  //@UseGuards(CheckAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filename = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const form = new FormData();
    form.append('file', file.buffer, { filename });
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Files}/upload`,
      form
    );
    return data;
  }

  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Files}/${fileId}`,
      null
    );
    return data;
  }
}
