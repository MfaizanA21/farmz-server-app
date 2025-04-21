import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { User } from '../../auth/user.entity';
@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  datePosted: Date;

  @Column({ type: 'bytea' })
  image: Buffer;

  @ManyToOne(() => User, (user) => user.blogs, { eager: true })
  user: User;

  @BeforeInsert()
  setUserId() {
    if (!this.user || !this.user.id) {
      throw new Error('User ID is required');
    }
  }
}
