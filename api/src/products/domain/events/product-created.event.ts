import { Product } from "../product";

export class ProductCreatedEvent  {
  constructor(public readonly product:Product){}
}
