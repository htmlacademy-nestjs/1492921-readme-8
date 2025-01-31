import { ForbiddenException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileValidateOptions } from '@project/shared-types';

export function ImageFileInterceptor(options: FileValidateOptions, fieldName = 'imageFile') {
  return FileInterceptor(fieldName, {
    fileFilter: (request, file, callback) => {
      if (!file.originalname.match(options.FileExtRegExp)) {
        return callback(new ForbiddenException(options.Message), false);
      }
      callback(null, true);
    },
    limits: { fileSize: options.MaxSize },
  });
}
