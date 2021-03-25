import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Category from './category';
import Comment from './comment';
import Tag from './tag';
import User from './user';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @IsNotEmpty()
  public title!: string;

  @ManyToOne(() => User, user => user.posts, {eager : true, onDelete: 'CASCADE'})
  public user!: User;

  @OneToMany(() => Comment, comment => comment.post)
  public comments!: Comment[];

  @OneToMany(() => Tag, tag => tag.post)
  public tags!: Tag[];

  @OneToOne(() => Category, category => category.post)
  public category!: Category;

  @Column()
  public url!: string;

  @Column()
  public text!: string;

  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}

export default Post;
