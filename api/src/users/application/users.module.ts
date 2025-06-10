import { DynamicModule, Module, Type } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../presenter/http/users.controller';
import { UserFactory } from '../domain/factories/user.factory';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserFactory],
})
export class UsersModule {
  static withInfrastructure(infrastructureModule: DynamicModule | Type) {
    return {
      module: UsersModule,
      imports: [infrastructureModule],
    };
  }
}
