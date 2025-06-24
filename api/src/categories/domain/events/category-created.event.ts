import { Category } from '../category';

export class CategoryCreatedEvent {
  constructor(public category: Category) {}
}
