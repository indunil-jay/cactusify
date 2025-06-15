import { BadRequestException } from '@nestjs/common';

export class ImageTooLargeException extends BadRequestException {
  constructor(maxSizeMB: number = 2) {
    super(
      `The uploaded image exceeds the maximum allowed size of ${maxSizeMB}MB.`,
    );
  }
}
