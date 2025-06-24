// category-parent.entity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('category_nested_relations')
export class CategoryNestedRelationEntity {
  @PrimaryColumn()
  childId: string;

  @PrimaryColumn()
  parentId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'childId' })
  child: CategoryEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.parents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent: CategoryEntity;
}
