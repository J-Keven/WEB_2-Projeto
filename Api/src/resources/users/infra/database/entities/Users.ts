import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
// import Address from './Address';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  title: string;

  @Column()
  avatar: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  public getAvatarUrl(): string {
    return this.avatar ? `http:localhost:3333/files/${this.avatar}` : '';
  }
  // @OneToOne(() => Address, address => address.user, {
  //   cascade: true,
  //   eager: true,
  // })
  // address: Address;
}

export default Users;
