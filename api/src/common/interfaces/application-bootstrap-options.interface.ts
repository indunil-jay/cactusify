import { DatabaseDriver } from '../enums/database-drivers.enum';

export interface ApplicationBootstrapOptions {
  driver: DatabaseDriver;
}
