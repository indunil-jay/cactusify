import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/application/users.module';
import { UsersInfrastructureModule } from './users/infrastructure/users-infrastructure.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-options.interface';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/application/shared.module';
import { GoogleAuthenticationController } from './users/presenter/http/google-authentication.controller';
import { ProductsModule } from './products/application/products.module';
import { ProductsInfrastructureModule } from './products/infrastructure/products-infrasturcture.module';
import { CategoryModule } from './categories/application/category.module';
import { CategoryInfrastructureModule } from './categories/infrastructure/category-infrastructure.module';

@Module({
  imports: [SharedModule],
  controllers: [AppController, GoogleAuthenticationController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),

        UsersModule.withInfrastructure(
          UsersInfrastructureModule.use(options.driver),
        ),

        ProductsModule.withInfrastructure(
          ProductsInfrastructureModule.use(options.driver),
        ),

        CategoryModule.withInfrastructure(
          CategoryInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
