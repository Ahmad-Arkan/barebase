import { BadRequestException, FileValidator, HttpStatus } from '@nestjs/common';
import { error } from 'console';
import { ErrorCode } from '../enum/error-code';

export class CustomFileValidator extends FileValidator {
  constructor() {
    super({});
  }

  isValid(file: any): boolean {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/jpg',
    ];
    return allowedMimeTypes.includes(file.mimetype);
  }

  buildErrorMessage(): string {
    throw new BadRequestException({
      message: 'Invalid file type or file size',
      errorCode: ErrorCode.INVALID_FILE,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
