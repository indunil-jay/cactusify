import { Exclude } from 'class-transformer';
import { Role } from 'src/shared/application/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProfilePictureEntity } from './user-profile-picture.entity';
import { UserAddressEntity } from './user-address.entity';

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

  @Column()
  isEmailVerified: boolean;

  @Column({ default: false })
  isTfaEnabled: boolean;

  @Column({ nullable: true })
  tfaSecret?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(
    () => UserProfilePictureEntity,
    (userProfilePicture) => userProfilePicture.user,
    {
      cascade: true,
      eager: true,
    },
  )
  profilePicture?: UserProfilePictureEntity;

  @OneToOne(() => UserAddressEntity, (userAddress) => userAddress.user, {
    cascade: true,
    eager: true,
  })
  address: UserAddressEntity;
}
