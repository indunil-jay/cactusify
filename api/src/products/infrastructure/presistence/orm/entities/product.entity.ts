import { ProductSize } from 'src/products/application/enums/product-size.enum';
import { UserEntity } from 'src/users/infrastructure/persistence/orm/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImageEntity } from './product-image.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 256 })
  name: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ length: 5000 })
  description: string;

  @Column()
  quantity: number;

  @Column({ enum: ProductSize })
  size: ProductSize;

  @Column()
  isActive: boolean;

  @Column()
  ageInMonths: number;

  @Column({ length: 300 })
  slug: string;

  @Column({ nullable: true, length: 256 })
  scientificName?: string;

  @Column({ nullable: true, type: 'numeric' })
  discountPrice?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: string;

  //Relations
  @ManyToOne(() => UserEntity, (user) => user.products, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(() => ProductImageEntity, productImage=>productImage.product, {cascade:true, eager:true})
  images: ProductImageEntity[];
}
