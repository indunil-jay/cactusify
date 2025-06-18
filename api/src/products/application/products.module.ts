import { DynamicModule, Module, Type } from '@nestjs/common';

@Module({})
export class ProductsModule {
 static withInfrastructure(infrastructureModule: DynamicModule | Type) {
    return {
      module: ProductsModule,
      imports: [infrastructureModule],
    };
  }
}
