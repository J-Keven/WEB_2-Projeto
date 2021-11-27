import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Categories from './Categories';

@Entity('freelas')
export default class Freelas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('float')
  price: number;

  @Column()
  userId: string;

  @Column()
  imageUrl: string;

  @Column()
  status: 'open' | 'in-progress' | 'concluded';

  @ManyToMany(() => Categories, { eager: true })
  @JoinTable({
    name: 'freelaCategorie',
  })
  categories: Categories[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
