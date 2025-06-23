import { Product } from 'src/products/domain/product';
import { ProductEntity } from '../entities/product.entity';
import { ProductSize as ProductSizeEnum } from 'src/products/application/enums/product-size.enum';
import { ProductSize } from 'src/products/domain/value-objects/product-size.vobject';

export class ProductMapper {
  static toDomain(productEntity: ProductEntity): Product {
    const product = new Product(productEntity.id);

    product.name = productEntity.name;
    product.price = productEntity.price;
    product.description = productEntity.description;
    product.discountPrice = productEntity.discountPrice;
    product.isActive = productEntity.isActive;
    product.quantity = productEntity.quantity;
    product.scientificName = productEntity.scientificName;
    product.size = new ProductSize(productEntity.size);
    product.slug = productEntity.slug;
    product.ageInMonths = productEntity.ageInMonths;
    product.userId = productEntity.userId;

    return product;
  }

  static toPresistence(product: Product): ProductEntity {
    const productEntity = new ProductEntity();

    productEntity.id = product.id;
    productEntity.name = product.name;
    productEntity.price = product.price;
    productEntity.description = product.description;
    productEntity.discountPrice = product.discountPrice;
    productEntity.isActive = product.isActive;
    productEntity.quantity = product.quantity;
    productEntity.scientificName = product.scientificName;
    productEntity.size = product.size.value as ProductSizeEnum;
    productEntity.slug = product.slug;
    productEntity.ageInMonths = product.ageInMonths;
    productEntity.userId = product.userId;

    return productEntity;
  }
}
