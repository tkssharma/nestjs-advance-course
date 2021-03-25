import { IsNotEmpty, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import Comment from './comment';
import Post from './post';

@Entity()
@Unique(['email'])
class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  public email!: string;

  @Column()
  @Length(4, 100)
  @IsNotEmpty()
  public password?: string;

  @OneToMany(() => Post, post => post.user)
  public posts!: Post[]

  @OneToMany(() => Comment, comment => comment.user)
  public comments!: Comment[]

  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}

export default User;
