import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('messages')
class Messages {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  to: string;

  @Column()
  from: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Messages;
