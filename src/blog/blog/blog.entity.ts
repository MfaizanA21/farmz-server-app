import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;
}
