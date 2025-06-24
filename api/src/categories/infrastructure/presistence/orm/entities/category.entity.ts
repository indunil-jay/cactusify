import { ProductEntity } from 'src/products/infrastructure/presistence/orm/entities/product.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/orm/entities/user.entity';
import {
  Column,
  CreateDateColumn,
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

  @Column({ length: 64, unique: true })
  name: string;

  @Column({ length: 1024 })
  description: string;

  @Column({ length: 96, unique: true })
  slug: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.categories, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

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
  products: ProductEntity[];
}
