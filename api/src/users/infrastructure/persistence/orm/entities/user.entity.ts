import { Exclude } from 'class-transformer';
import { Role } from 'src/shared/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true, length: 96, nullable: false })
  email: string;

  @Column({ length: 32 })
  firstName: string;

  @Column({ nullable: true, length: 32 })
  lastName?: string;

  @Column()
  userName: string;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @Column({ nullable: true })
  bio?: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  isEmailVerified: boolean;

  @Column({ default: false })
  isTfaEnabled: boolean;

  @Column({ nullable: true })
  tfaSecret?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
