import { HttpStatus } from '@nestjs/common';

export const CommonResponse = {
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  },
  UserNotAuth: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not Auth',
  },
} as const;
