import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Quiz } from './quiz.model';
import { UserQuizAnswer } from './user-quiz-answer.model';
import { User } from './user.model';


@Entity({ name:'user_quiz' })
export class UserQuiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.userQuizs)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;
  

  @ManyToOne(() => User, (quiz) => quiz.userQuizs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => UserQuizAnswer, (userAnswer) => userAnswer.userQuiz, {
    cascade: true,
    eager: true,
  })
  userAnswers: UserQuizAnswer[];

  @Column({ type: 'smallint' })
  score: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

