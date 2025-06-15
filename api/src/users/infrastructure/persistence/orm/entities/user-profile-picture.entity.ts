import { FileTypes } from 'src/shared/application/enums/file-types.enum';
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

@Entity('user-profile-pictures')
export class UserProfilePictureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column()
  path: string;

  @Column({ enum: FileTypes, default: FileTypes.IMAGE })
  type?: string;

  @Column({ nullable: true })
  mime?: string;

  @Column({ nullable: true })
  size?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @JoinColumn()
  @OneToOne(() => UserEntity, (user) => user.profilePicture)
  user: UserEntity;
}
