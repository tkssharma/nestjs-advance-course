import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(['email', 'title'])
@Unique(['title'])
class Post {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  public title!: string;

  @Column({ type: 'varchar', length: 255})
  public url!: string;

  @Column({ type: 'varchar', length: 255})
  public email!: string;

  @Column({ type: 'jsonb', default: null })
  public social_links!: object;

  @Column({ type: 'jsonb', default: null })
  public tags!: object;

  @Column({ type: 'varchar', length: 255, default: null })
  public text!: string;

  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}

export default Post;
