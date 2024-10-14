import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserQuiz } from './user-quiz.model';


@Entity({ name:'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'first_name' })
  firstName: string;

  @Column({ nullable: false, name: 'last_name' })
  lastName: string;

  @Column({ nullable: false, name: 'profile_url' })
  profileUrl: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => UserQuiz, (userQuiz) => userQuiz.user, {
    cascade: true,
    eager: false,
  })
  userQuizs: UserQuiz[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

