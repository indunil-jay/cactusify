import { Category } from '../category';

export class CategoryUpdatedEvent {
  constructor(public readonly category: Category) {}
}
