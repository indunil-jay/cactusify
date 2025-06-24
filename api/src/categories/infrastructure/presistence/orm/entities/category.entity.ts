import { ProductEntity } from 'src/products/infrastructure/presistence/orm/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 1024 })
  description: string;

  @Column({ length: 96 })
  slug: string;

  // Self-referencing parent category
  @Column({ nullable: true })
  parentId?: string;

  @ManyToOne(() => CategoryEntity, (category) => category.children)
  // This makes parentId the FK column
  @JoinColumn({ name: 'parentId' })
  parent?: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  proudcts: ProductEntity[];
}
