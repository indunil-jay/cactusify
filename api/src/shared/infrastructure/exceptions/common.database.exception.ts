import { InternalServerErrorException, Logger } from '@nestjs/common';

type ClassType<T = any> = { new (...args: any[]): T };

export class DatabaseExeception extends InternalServerErrorException {
  private readonly logger = new Logger(DatabaseExeception.name);
  constructor(cls: ClassType, error: any) {
    super(`Error occured::${cls.name}`);
    this.logger.error(`DATABASE_ERROR : ${error}`);
  }
}
