import { ForbiddenException } from '@nestjs/common';

export class AccessDeniedException extends ForbiddenException {
  constructor() {
    super(`You do not have permission to access this route.`);
  }
}
