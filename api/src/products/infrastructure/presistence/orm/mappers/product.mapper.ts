import { Product } from 'src/products/domain/product';
import { ProductEntity } from '../entities/product.entity';
import { ProductSize as ProductSizeEnum } from 'src/products/application/enums/product-size.enum';
import { ProductSize } from 'src/products/domain/value-objects/product-size.vobject';
import { ProductImageEntity } from '../entities/product-image.entity';
import { ProductImage } from 'src/products/domain/value-objects/product-image.vobject';

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

    product.images = productEntity.images.map(image=> {
      const productImage  = new ProductImage(image.path)
      productImage.mime = image.mime;
      productImage.name = image.name;
      productImage.size = image.size;
      productImage.type = image.type;
      return productImage;
    });

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

    productEntity.images = product.images.map((image) => {
      const productImage = new ProductImageEntity();
      productImage.name = image.name;
      productImage.mime = image.mime;
      productImage.path = image.path;
      productImage.size = image.size;
      productImage.type = image.type;

      return productImage;
    });

    return productEntity;
  }
}
