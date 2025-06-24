import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Category } from '../category';

@Injectable()
export class CategoryFactory {
  create(
    name: string,
    description: string,
    userId: string,
    slug?: string,
  ): Category {
    const id = randomUUID();
    const category = new Category(id);
    category.name = name;
    category.userId = userId;
    category.description = description;
    category.slug = slug ? slug : name.split(' ').join('-');
    return category;
  }
}
