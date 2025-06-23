import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('password_reset_tokens')
export class PasswordResetTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  expiresAt: Date;

  @Column()
  userId: string;

  @UpdateDateColumn()
  createdAt: Date;

  @OneToOne(() => UserEntity, (user) => user.resetToken, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;
}
