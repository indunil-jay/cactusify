import { Injectable } from '@nestjs/common';
import { Product } from '../product';
import { randomUUID } from 'crypto';
import { ProductSize } from '../value-objects/product-size.vobject';
import { IUploadedFilePayload } from 'src/shared/application/interfaces/uploaded-file-payload.interface';
import { ProductImage } from '../value-objects/product-image.vobject';

@Injectable()
export class ProductFactory {
  create(
    images: IUploadedFilePayload[],
    name: string,
    price: number,
    quantity: number,
    isActive: boolean,
    description: string,
    ageInMonths: number,
    userId: string,
    size: 'small' | 'large' | 'medium',
    discountPrice?: number,
    scientificName?: string,
    slug?: string,
  ): Product {
    const id = randomUUID();
    const product = new Product(id);
    product.quantity = quantity;
    product.price = price;
    product.name = name;
    product.isActive = isActive;
    product.description = description;
    product.size = new ProductSize(size);
    product.ageInMonths = ageInMonths;
    product.userId = userId;
    product.discountPrice = discountPrice;
    product.slug = slug ? slug : name.split(' ').join('-');
    product.scientificName = scientificName;
    product.images = images.map((image) => {
      const productImage = new ProductImage(image.path);

      productImage.mime = image.mime;
      productImage.name = image.name;
      productImage.size = image.size;
      productImage.type = image.type;

      return productImage;
    });

    return product;
  }
}
