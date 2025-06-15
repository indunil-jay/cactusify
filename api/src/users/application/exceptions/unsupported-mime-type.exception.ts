import { BadRequestException } from '@nestjs/common';

export class UnsupportedImageMimeTypeException extends BadRequestException {
  constructor(mimeType: string) {
    super(`The MIME type '${mimeType}' is not supported for image uploads.`);
  }
}
