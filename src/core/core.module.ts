import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseDriver } from 'src/common/enums/database-drivers.enum';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';

export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === DatabaseDriver.ORM
        ? [
            TypeOrmModule.forRoot({
              type: 'postgres',
              port: 5433,
              username: 'postgres',
              password: 'mypass1122',
              database: 'cactusify_db',
              autoLoadEntities: true,
              synchronize: true,
            }),
          ]
        : [];

    return {
      module: CoreModule,
      imports,
    };
  }
}
