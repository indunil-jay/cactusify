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

  @ManyToMany(() => CategoryEntity, (category) => category.children)
  @JoinTable({
    name: 'category_parents',
    joinColumn: { name: 'childId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'parentId', referencedColumnName: 'id' },
  })
  parents?: CategoryEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category.parents)
  children?: CategoryEntity[];

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products: ProductEntity[];
}
