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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { multerFileToFormData } from '@project/shared-helpers';
import { MongoIdValidationPipe } from '@project/pipes';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@Controller('files')
@UseFilters(AxiosExceptionFilter)
export class FilesController {
  constructor(private readonly httpService: HttpService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const form = new FormData();
    multerFileToFormData(form, file, 'file');

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
