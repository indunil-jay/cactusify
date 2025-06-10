import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName?: string;

  @Column()
  userName?: string;

  @Column()
  password?: string;

  @Column()
  dateOfBirth?: string;

  @Column()
  bio?: string;

  // @Column()
  // imageUrl: string;

  // address: any;
  // role: any;
}
