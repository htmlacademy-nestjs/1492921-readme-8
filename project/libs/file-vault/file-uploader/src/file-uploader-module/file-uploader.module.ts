import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigType } from '@nestjs/config';

import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderRepository } from './file-uploader.repository';
import { FileUploaderFactory } from './file-uploader.factory';
import { FileModel, FileSchema } from './file.model';
import { MongooseModule } from '@nestjs/mongoose';
import { fileVaultConfig } from '@project/file-vault-config';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [fileVaultConfig.KEY],
      useFactory: (config: ConfigType<typeof fileVaultConfig>) => {
        return [
          {
            rootPath: config.uploadDirectory,
            serveRoot: config.serveDirectory,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]),
  ],
  providers: [FileUploaderService, FileUploaderRepository, FileUploaderFactory],
  controllers: [FileUploaderController],
})
export class FileUploaderModule {}
