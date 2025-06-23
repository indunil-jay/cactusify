import { Product } from "src/products/domain/product";

export abstract class CreateProductRepository {
abstract save(product:Product):Promise<Product>
}
