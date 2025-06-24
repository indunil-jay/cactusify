import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor() {
    super(
      `Category  was not found. Please verify the identifier and try again.`,
    );
  }
}
