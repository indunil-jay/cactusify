import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user-addresses')
export class UserAddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 64 })
  addressLine1: string;

  @Column({ nullable: true, length: 64 })
  addressLine2?: string;

  @Column({ length: 32 })
  state: string;

  @Column({ length: 32 })
  city: string;

  @Column({ length: 6 })
  zipCode: string;

  @JoinColumn()
  @OneToOne(() => UserEntity, (user) => user.address)
  user: UserEntity;
}
