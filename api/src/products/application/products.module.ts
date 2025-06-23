import { DynamicModule, Module, Type } from '@nestjs/common';
import { ProductsController } from '../presenter/http/products.controller';
import { SharedModule } from 'src/shared/application/shared.module';
import { ProductFacade } from './product.facade';
import { CreateProductCommandHandler } from './commands/handlers/create-product.command-handler';
import { ProductFactory } from '../domain/factories/product.factory';
import { ProductCreatedEventHandler } from './event-handlers/product-created.event-handler';

@Module({
  imports: [SharedModule],
  controllers: [ProductsController],
  providers: [
    ProductFacade,
    CreateProductCommandHandler,
    ProductFactory,
    ProductCreatedEventHandler,
  ],
  exports: [SharedModule],
})
export class ProductsModule {
  static withInfrastructure(infrastructureModule: DynamicModule | Type) {
    return {
      module: ProductsModule,
      imports: [infrastructureModule],
    };
  }
}
