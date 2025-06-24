import { ProductEntity } from 'src/products/infrastructure/presistence/orm/entities/product.entity';
import { UserEntity } from 'src/users/infrastructure/persistence/orm/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CategoryNestedRelationEntity, } from './category-nested.entity';

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

  @OneToMany(
    () => CategoryNestedRelationEntity,
    (categoryParent) => categoryParent.child,
    {
      cascade: true,
      eager: true,
    },
  )
  parents: CategoryNestedRelationEntity[];

  @OneToMany(
    () => CategoryNestedRelationEntity,
    (categoryParent) => categoryParent.parent,
    {
      cascade: true,
      eager: true,
    },
  )
  children: CategoryNestedRelationEntity[];

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products: ProductEntity[];
}
