import { Injectable } from '@nestjs/common';
import { Product } from '../product';
import { randomUUID } from 'crypto';
import { ProductSize } from '../value-objects/product-size.vobject';

@Injectable()
export class ProductFactory {
  create(
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

    return product;
  }
}
