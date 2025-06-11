import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('refresh-token-ids')
export class RefreshTokenIdsEntity {
  @PrimaryColumn()
  @Index()
  userId: string;

  @Column()
  tokenId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
